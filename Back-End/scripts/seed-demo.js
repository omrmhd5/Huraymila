require("dotenv").config();
const path = require("path");
const { execFileSync } = require("child_process");
const mongoose = require("mongoose");
const Agency = require("../Models/Agency");
const Governor = require("../Models/Governor");
const Initiative = require("../Models/Initiative");
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
    agency.email = index === 0 ? "agency@agency.com" : `agency${index}@agency.com`;
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
  const agencies = await Agency.find().sort({ _id: 1 });
  await Initiative.deleteMany({});

  const rows = agencies.flatMap((agency) =>
    INITIATIVE_TEMPLATES.map((template) => ({
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
    })),
  );

  await Initiative.insertMany(rows);
  console.log(`Seeded ${rows.length} demo initiatives`);
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
  await seedDemoInitiatives();
  console.log("Demo logins set: governor@governor.com and agency@agency.com");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
