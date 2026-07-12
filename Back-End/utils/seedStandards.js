const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Standard = require("../Models/Standard");
require("dotenv").config();

const extractArray = (content, startIndex) => {
  let braceCount = 0;
  let inString = false;
  let quoteChar = "";

  for (let i = startIndex; i < content.length; i++) {
    const char = content[i];

    // Handle string literals to avoid matching brackets inside strings
    if ((char === '"' || char === "'" || char === "`") && content[i - 1] !== "\\") {
      if (!inString) {
        inString = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inString = false;
      }
    }

    if (!inString) {
      if (char === "[") {
        braceCount++;
      } else if (char === "]") {
        braceCount--;
        if (braceCount === 0) {
          return content.substring(startIndex, i + 1);
        }
      }
    }
  }
  return null;
};

const seedStandards = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/huraymila";
    await mongoose.connect(uri);
    console.log("MongoDB Connected to:", uri);

    const contextPath = path.join(__dirname, "../../Front-End/src/contexts/LanguageContext.jsx");
    if (!fs.existsSync(contextPath)) {
      throw new Error(`LanguageContext.jsx not found at path: ${contextPath}`);
    }

    const content = fs.readFileSync(contextPath, "utf8");

    // Find all occurrences of "standards: ["
    const target = "standards: [";
    const indices = [];
    let idx = content.indexOf(target);
    while (idx !== -1) {
      indices.push(idx + target.length - 1); // index of the opening bracket [
      idx = content.indexOf(target, idx + 1);
    }

    if (indices.length < 2) {
      throw new Error("Could not find both Arabic and English standards arrays in LanguageContext.jsx");
    }

    // Extract arrays from text
    const arArrayStr = extractArray(content, indices[0]);
    const enArrayStr = extractArray(content, indices[1]);

    if (!arArrayStr || !enArrayStr) {
      throw new Error("Failed to extract standard arrays text from LanguageContext.jsx");
    }

    // Evaluate arrays safely
    const arStandards = new Function(`return ${arArrayStr}`)();
    const enStandards = new Function(`return ${enArrayStr}`)();

    console.log(`Successfully parsed ${arStandards.length} Arabic standards and ${enStandards.length} English standards.`);

    // Match and upsert 80 standards
    for (let i = 1; i <= 80; i++) {
      const arItem = arStandards.find(item => item.number === i || item.id === i);
      const enItem = enStandards.find(item => item.number === i || item.id === i);

      if (!arItem || !enItem) {
        console.warn(`Standard ${i} is missing from one of the arrays.`);
        continue;
      }

      const existing = await Standard.findOne({ number: i });

      if (existing) {
        existing.standard_ar = arItem.standard;
        existing.standard_en = enItem.standard;
        existing.requirements_ar = arItem.requirements || [];
        existing.requirements_en = enItem.requirements || [];
        await existing.save();
        console.log(`Updated Standard #${i} text details.`);
      } else {
        await Standard.create({
          number: i,
          standard_ar: arItem.standard,
          standard_en: enItem.standard,
          requirements_ar: arItem.requirements || [],
          requirements_en: enItem.requirements || [],
          status: "didnt_submit",
          progress: 0,
          assigned_agencies: []
        });
        console.log(`Created new Standard #${i} in database.`);
      }
    }

    console.log("Standards migration and seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
};

seedStandards();
