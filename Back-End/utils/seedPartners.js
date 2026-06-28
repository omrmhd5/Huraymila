const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../.env") });

const Partner = require("../Models/Partner");

const partners = [
  {
    name_ar: "وزارة البيئة والمياه والزراعة بحريملاء",
    name_en: "Ministry of Environment, Water and Agriculture",
    logo: "/public/logos/وزارة البيئة والمياه والزراعة.jpg",
    order: 1,
  },
  {
    name_ar: "مستشفى حريملاء العام",
    name_en: "Huraymila General Hospital",
    logo: "/public/logos/مستشفى حريملاء العام.jpg",
    order: 2,
  },
  {
    name_ar: "إدارة الدفاع المدني بحريملاء",
    name_en: "Civil Defense",
    logo: "/public/logos/الدفاع_المدني_السعودي.png",
    order: 3,
  },
  {
    name_ar: "الشركة الوطنية للمياه",
    name_en: "National Water Company",
    logo: "/public/logos/شعار_شركة_المياه_الوطنية.jpeg",
    order: 4,
  },
  {
    name_ar: "بلدية محافظة حريملاء",
    name_en: "Riyadh Municipality",
    logo: "/public/logos/امانة الرياض.ico",
    order: 5,
  },
  {
    name_ar: "شرطة محافظة حريملاء",
    name_en: "Police",
    logo: "/public/logos/الشرطة.png",
    order: 6,
  },
  {
    name_ar: "شعبة مرور حريملاء",
    name_en: "Traffic Department",
    logo: "/public/logos/المرور.png",
    order: 7,
  },
  {
    name_ar: "جمعية حريملاء الخيرية",
    name_en: "Charity Association",
    logo: "/public/logos/جمعية حريملاء الخيرية.jpg",
    order: 8,
  },
  {
    name_ar: "جمعية التنمية الأهلية بحريملاء",
    name_en: "Development Association",
    logo: "/public/logos/جمعية التنمية الاهلية بحريملاء.jpg",
    order: 9,
  },
  {
    name_ar: "جمعية أصدقاء المرضى بحريملاء",
    name_en: "Friends of Patients",
    logo: "/public/logos/جمعية اصدقاء المرضى بحريملاء.png",
    order: 10,
  },
];

const seedPartners = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/huraymila",
    );
    console.log("MongoDB Connected...");

    await Partner.deleteMany();
    console.log("Deleted existing partners...");

    await Partner.insertMany(partners);
    console.log("Seeded partners successfully!");

    process.exit();
  } catch (error) {
    console.error("Error seeding partners:", error);
    process.exit(1);
  }
};

seedPartners();
