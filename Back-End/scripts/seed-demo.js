require("dotenv").config();
const path = require("path");
const { execFileSync } = require("child_process");
const mongoose = require("mongoose");
const Agency = require("../Models/Agency");
const Governor = require("../Models/Governor");
const Initiative = require("../Models/Initiative");
const Volunteer = require("../Models/Volunteer");
const Report = require("../Models/Report");
const SuccessStory = require("../Models/SuccessStory");
const HealthIndicator = require("../Models/HealthIndicator");
const { applyIndicatorCopy } = require("../utils/healthIndicatorCopy");

const CONTACT_NAMES = [
  "فهد بن عبدالله العتيبي",
  "سلطان بن سعد القحطاني",
  "ناصر بن خالد الدوسري",
  "عبدالرحمن بن محمد الشمري",
  "تركي بن فهد الحربي",
  "مشعل بن عبدالعزيز المطيري",
  "سعد بن إبراهيم السبيعي",
  "ماجد بن يوسف العنزي",
  "بندر بن صالح الغامدي",
  "وليد بن حسن الزهراني",
  "فيصل بن عمر الشهري",
  "خالد بن ناصر البقمي",
  "أحمد بن سلمان الرشيد",
];

const INITIATIVE_TEMPLATES = [
  {
    title: (name) => `مبادرة توعوية صحية - ${name}`,
    description: (name) =>
      `مبادرة تجريبية لتنظيم أنشطة توعوية صحية بالتعاون مع ${name}.`,
    imageUrl: "/assets/health-workshop.jpg",
    status: "active",
    maxVolunteers: 30,
    startOffset: -20,
    endOffset: 40,
  },
  {
    title: (name) => `مبادرة المساحات الخضراء - ${name}`,
    description: (name) =>
      `مبادرة تجريبية للعناية بالحدائق والمساحات الخضراء مع ${name}.`,
    imageUrl: "/assets/green-garden.jpg",
    status: "gathering volunteers",
    maxVolunteers: 20,
    startOffset: -5,
    endOffset: 50,
  },
  {
    title: (name) => `مبادرة المشي والنشاط البدني - ${name}`,
    description: (name) =>
      `مبادرة تجريبية لتشجيع المشي والنشاط البدني بالشراكة مع ${name}.`,
    imageUrl: "/assets/walking-initiative.jpg",
    status: "completed",
    maxVolunteers: 40,
    startOffset: -80,
    endOffset: -10,
  },
];

function demoPhone(index) {
  return `05${String(index + 1).padStart(6, "0")}`;
}

function addDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

const ARCHIVE = path.join(__dirname, "fixtures", "huraymila-demo.archive.gz");
const LOCAL_URI = "mongodb://127.0.0.1:27017/huraymila-demo";
const GOVERNOR_NAME = "منسق مدينة حريملاء الصحية";

function pickUri() {
  if (process.argv.includes("--remote")) {
    const uri = process.env.MONGO_URI_REMOTE;
    if (!uri || uri.includes("127.0.0.1") || uri.includes("localhost")) {
      throw new Error("Remote seed needs MONGO_URI_REMOTE for huraymila-demo.");
    }
    return uri;
  }
  return process.env.MONGO_URI_LOCAL || LOCAL_URI;
}

async function resetLogins() {
  const agencies = await Agency.find().sort({ _id: 1 });
  if (agencies.length === 0) throw new Error("No agencies found");

  for (let index = 0; index < agencies.length; index += 1) {
    const agency = agencies[index];
    agency.email =
      index === 0 ? "agency@agency.com" : `agency${index}@agency.com`;
    agency.password = "agency123";
    agency.contactPerson = {
      name: CONTACT_NAMES[index % CONTACT_NAMES.length],
      email: `contact${index + 1}@demo.sa`,
      phoneNumber: demoPhone(index),
    };
    await agency.save();
  }

  const governor = await Governor.findOne({ name: GOVERNOR_NAME });
  if (!governor) throw new Error("Governor not found");
  governor.email = "governor@governor.com";
  governor.password = "governor123";
  await governor.save();

  console.log(
    `Demo agency logins: agency@agency.com through agency${agencies.length - 1}@agency.com`,
  );
}

async function demoizeHealthIndicators() {
  const doc = await HealthIndicator.findOne();
  if (!doc) return;
  doc.indicators.forEach((indicator) => applyIndicatorCopy(indicator));
  await doc.save();
}

async function seedDemoInitiatives() {
  const agency = await Agency.findOne().sort({ _id: 1 });
  if (!agency) throw new Error("No agencies found");
  await Initiative.deleteMany({});

  const rows = INITIATIVE_TEMPLATES.map((template) => ({
    title: template.title(agency.name),
    description: template.description(agency.name),
    startDate: addDays(template.startOffset),
    endDate: addDays(template.endOffset),
    status: template.status,
    approvalStatus: "approved",
    maxVolunteers: template.maxVolunteers,
    currentVolunteers: 0,
    agency: agency._id,
    imageUrl: template.imageUrl,
    volunteers: [],
  }));

  const initiatives = await Initiative.insertMany(rows);
  console.log(`Seeded ${initiatives.length} demo initiatives`);
  return initiatives;
}

const DEMO_PEOPLE = [
  "عبدالله بن فهد السديري",
  "يوسف بن سعد العتيبي",
  "عمر بن خالد القحطاني",
  "نورة بنت سعد الدوسري",
  "محمد بن فهد الشمري",
  "لمى بنت عبدالعزيز الحربي",
  "سلطان بن ناصر المطيري",
  "هند بنت وليد الزهراني",
  "فيصل بن بندر الغامدي",
];

async function seedDemoCommunity(initiatives) {
  await Volunteer.deleteMany({});
  await Report.deleteMany({});
  await SuccessStory.deleteMany({});

  const volunteers = [];
  for (let index = 0; index < 3; index += 1) {
    const volunteer = await Volunteer.create({
      fullName: DEMO_PEOPLE[index],
      email:
        index === 0
          ? "volunteer@volunteer.com"
          : `volunteer${index}@volunteer.com`,
      password: "volunteer123",
      phoneNumber: demoPhone(13 + index),
      initiatives: [{ initiative: initiatives[index]._id }],
      isActive: true,
    });
    volunteers.push(volunteer);

    const initiative = await Initiative.findById(initiatives[index]._id);
    initiative.volunteers.push({ volunteer: volunteer._id });
    await initiative.save();
  }

  await Report.insertMany([
    {
      name: DEMO_PEOPLE[3],
      email: "feedback1@demo.sa",
      phone: demoPhone(16),
      subject: "اقتراح مسار مشي",
      details: "اقتراح تجريبي لإضافة مسار مشي مظلل قرب الحي السكني.",
      status: "pending",
    },
    {
      name: DEMO_PEOPLE[4],
      email: "feedback2@demo.sa",
      phone: demoPhone(17),
      subject: "ملاحظة عن حديقة الحي",
      details: "ملاحظة تجريبية عن الحاجة إلى مقاعد إضافية في الحديقة العامة.",
      status: "under review",
    },
    {
      name: DEMO_PEOPLE[5],
      email: "feedback3@demo.sa",
      phone: demoPhone(18),
      subject: "شكر على الحملة التوعوية",
      details: "مشاركة تجريبية للثناء على الحملة الصحية الأخيرة في المحافظة.",
      status: "resolved",
    },
  ]);

  await SuccessStory.insertMany([
    {
      author: DEMO_PEOPLE[6],
      email: "story1@demo.sa",
      phone: demoPhone(19),
      title: "ممشى الحي",
      description:
        "قصة تجريبية عن انطلاق مجموعة مشي أسبوعية شجعت الجيران على النشاط البدني.",
      date: addDays(-12),
      approvalStatus: "approved",
      imageUrl: "/assets/sustainable-transport.jpg",
    },
    {
      author: DEMO_PEOPLE[7],
      email: "story2@demo.sa",
      phone: demoPhone(20),
      title: "حديقة الحي",
      description:
        "قصة تجريبية عن تحويل أرض فضاء إلى حديقة صغيرة يستخدمها الأطفال والعائلات.",
      date: addDays(-20),
      approvalStatus: "approved",
      imageUrl: "/assets/green-garden.jpg",
    },
    {
      author: DEMO_PEOPLE[8],
      email: "story3@demo.sa",
      phone: demoPhone(21),
      title: "ورشة التوعية الصحية",
      description:
        "قصة تجريبية عن ورشة إسعافات أولية حضرها طلاب وأهالي المحافظة.",
      date: addDays(-30),
      approvalStatus: "approved",
      imageUrl: "/assets/health-workshop.jpg",
    },
  ]);

  console.log(
    `Seeded ${volunteers.length} volunteers, 3 feedback entries, and 3 success stories`,
  );
}

async function main() {
  const uri = pickUri();
  console.log("Restoring huraymila-demo snapshot...");
  execFileSync(
    "mongorestore",
    [
      `--uri=${uri}`,
      "--gzip",
      `--archive=${ARCHIVE}`,
      "--nsFrom=huraymila-demo.*",
      "--nsTo=huraymila-demo.*",
      "--drop",
    ],
    { stdio: "inherit" },
  );

  await mongoose.connect(uri);
  await resetLogins();
  await demoizeHealthIndicators();
  const initiatives = await seedDemoInitiatives();
  await seedDemoCommunity(initiatives);
  console.log("Demo logins set: governor@governor.com and agency@agency.com");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
