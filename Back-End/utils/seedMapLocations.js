/**
 * ONE-TIME SEEDER — Populates MapLocation collection using Google Places API (New)
 * Nearby Search: POST https://places.googleapis.com/v1/places:searchNearby
 *
 * BEFORE RUNNING:
 *  1. Go to https://console.cloud.google.com/apis/library
 *  2. Search for "Places API (New)" and click ENABLE
 *  3. Then run: node Back-End/utils/seedMapLocations.js
 *
 * Run once only. All future map data is served from MongoDB — no Google calls.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const MapLocation = require("../Models/MapLocation");

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/huraymila";

// Huraymila city center
const HURAYMILA_LAT = 25.1158;
const HURAYMILA_LNG = 46.104;
const SEARCH_RADIUS = 8000; // 8km

// Each entry: which Google place types to search, which app category + icon to assign
const CATEGORY_SEARCHES = [
  {
    category: "government",
    icon: "Building2",
    includedTypes: ["government_office", "local_government_office"],
  },
  {
    category: "local",
    icon: "Building",
    includedTypes: ["city_hall", "community_center", "mosque"],
  },
  {
    category: "educational",
    icon: "GraduationCap",
    includedTypes: ["school", "secondary_school", "university", "library"],
  },
  {
    category: "security",
    icon: "Shield",
    includedTypes: ["police", "fire_station"],
  },
  {
    category: "health",
    icon: "Heart",
    includedTypes: ["hospital", "pharmacy", "doctor"],
  },
  {
    category: "public",
    icon: "Leaf",
    includedTypes: ["park", "shopping_mall", "supermarket", "gas_station"],
  },
];

/**
 * Nearby Search (New) — POST https://places.googleapis.com/v1/places:searchNearby
 * Docs: https://developers.google.com/maps/documentation/places/web-service/nearby-search
 */
async function nearbySearch(includedTypes, languageCode = "ar") {
  const url = "https://places.googleapis.com/v1/places:searchNearby";

  const body = {
    locationRestriction: {
      circle: {
        center: {
          latitude: HURAYMILA_LAT,
          longitude: HURAYMILA_LNG,
        },
        radius: SEARCH_RADIUS,
      },
    },
    includedTypes,
    maxResultCount: 20,
    languageCode,
    rankPreference: "POPULARITY",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      // FieldMask: only fields we need — keeps billing at Pro SKU tier
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.location,places.formattedAddress,places.rating,places.primaryTypeDisplayName,places.businessStatus",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error(
      `  ❌ API error [${languageCode}] for types [${includedTypes.join(", ")}]:`
    );
    try {
      const errJson = JSON.parse(errText);
      const reason = errJson?.error?.details?.[0]?.reason || errJson?.error?.status;
      const msg = errJson?.error?.message;
      console.error(`     ${reason}: ${msg}`);
      if (reason === "API_KEY_SERVICE_BLOCKED") {
        console.error(
          `\n  ⚠️  ACTION REQUIRED: Enable "Places API (New)" in Google Cloud Console:`
        );
        console.error(
          `     https://console.cloud.google.com/apis/library/places-backend.googleapis.com\n`
        );
        process.exit(1);
      }
    } catch {
      console.error(`     ${errText}`);
    }
    return [];
  }

  const data = await response.json();
  return data.places || [];
}

async function seed() {
  if (!API_KEY) {
    console.error("❌ GOOGLE_MAPS_API_KEY is not set in .env");
    process.exit(1);
  }

  console.log("🌍 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB\n");

  let totalSaved = 0;
  let totalSkipped = 0;

  for (const cat of CATEGORY_SEARCHES) {
    console.log(
      `\n📍 [${cat.category.toUpperCase()}] Searching for: ${cat.includedTypes.join(", ")}`
    );

    // Fetch both Arabic and English names in parallel
    const [arPlaces, enPlaces] = await Promise.all([
      nearbySearch(cat.includedTypes, "ar"),
      nearbySearch(cat.includedTypes, "en"),
    ]);

    // Build placeId → English name map
    const enNameMap = {};
    for (const p of enPlaces) {
      enNameMap[p.id] = p.displayName?.text || "";
    }

    console.log(`   Found ${arPlaces.length} places`);

    for (const place of arPlaces) {
      // Skip permanently closed businesses
      if (place.businessStatus === "CLOSED_PERMANENTLY") {
        console.log(`  ⏭️  Skipped (permanently closed): ${place.displayName?.text}`);
        continue;
      }

      const doc = {
        placeId: place.id,
        name: place.displayName?.text || "Unknown",
        nameEn: enNameMap[place.id] || place.displayName?.text || "Unknown",
        category: cat.category,
        lat: place.location?.latitude,
        lng: place.location?.longitude,
        address: place.formattedAddress || "",
        rating: place.rating || null,
        icon: cat.icon,
      };

      try {
        await MapLocation.findOneAndUpdate({ placeId: place.id }, doc, {
          upsert: true,
          new: true,
        });
        console.log(`  ✅ ${doc.name}`);
        totalSaved++;
      } catch (err) {
        if (err.code === 11000) {
          // Duplicate — same place already stored from a previous category run
          totalSkipped++;
          console.log(`  ⏭️  Skipped (already exists): ${doc.name}`);
        } else {
          console.error(`  ❌ DB error for "${doc.name}":`, err.message);
        }
      }
    }
  }

  console.log(`\n🎉 Seeding complete!`);
  console.log(`   Saved / Updated: ${totalSaved}`);
  console.log(`   Skipped:         ${totalSkipped}`);

  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeder crashed:", err);
  process.exit(1);
});
