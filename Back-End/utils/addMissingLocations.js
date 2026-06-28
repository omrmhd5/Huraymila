require("dotenv").config();
const mongoose = require("mongoose");
const MapLocation = require("../Models/MapLocation");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/huraymila";

const locations = [
  {
    placeId: "manual_dev_assoc_huraymila",
    name: "جمعية التنمية الأهلية بحريملاء",
    nameEn: "Huraymila Community Development Association",
    category: "local",
    lat: 25.1118437,
    lng: 46.1135103,
    address: "شارع النخيل، حي النخيل، حريملاء 15431",
    rating: 3.7,
    icon: "Building",
    isCustom: false,
  },
  {
    placeId: "manual_charity_assoc_huraymila",
    name: "الجمعية الخيرية بحريملاء",
    nameEn: "Huraymila Charity Association",
    category: "local",
    lat: 25.1182528,
    lng: 46.0930055,
    address: "طريق الأمير سلطان بن عبدالعزيز، حي الروضة، حريملاء 15431",
    rating: 4.1,
    icon: "Building",
    isCustom: false,
  },
  {
    placeId: "manual_red_crescent_huraymila",
    name: "مركز اسعاف الهلال الأحمر بحريملاء",
    nameEn: "Saudi Red Crescent Ambulance Center Huraymila",
    category: "health",
    lat: 25.128725,
    lng: 46.0853796,
    address: "طريق الملك فهد، حريملاء 15431",
    rating: 4.4,
    icon: "Heart",
    isCustom: false,
  },
  {
    placeId: "manual_sports_club_huraymila",
    name: "نادي حريملاء السعودي",
    nameEn: "Huraymila Saudi Club",
    category: "public",
    lat: 25.1231099,
    lng: 46.0849321,
    address: "حي الروضة، حريملاء 15431",
    rating: 3.8,
    icon: "Leaf",
    isCustom: false,
  },
];

async function insertLocations() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully.");

    for (const loc of locations) {
      console.log(`Upserting: ${loc.name} with rating ${loc.rating}`);
      await MapLocation.findOneAndUpdate(
        { placeId: loc.placeId },
        loc,
        { upsert: true, new: true }
      );
    }

    console.log("Successfully inserted all missing locations!");
    process.exit(0);
  } catch (error) {
    console.error("Error inserting locations:", error);
    process.exit(1);
  }
}

insertLocations();
