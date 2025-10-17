const mongoose = require("mongoose");
const HealthIndicator = require("../Models/HealthIndicator");
require("dotenv").config();

const seedHealthIndicators = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/huraymila"
    );

    // Connected to MongoDB

    // Check if health indicators already exist
    const existingIndicators = await HealthIndicator.findOne();
    if (existingIndicators) {
      // Health indicators already exist in the database
      return;
    }

    // Default indicators data
    const defaultIndicators = [
      {
        id: "airQuality",
        title: {
          ar: "جودة الهواء",
          en: "Air Quality",
        },
        currentValue: 85,
        targetValue: 90,
        unit: "%",
        description: {
          ar: "PM2.5: 12 μg/m³",
          en: "PM2.5: 12 μg/m³",
        },
        status: {
          ar: "جيد",
          en: "Good",
        },
      },
      {
        id: "waterQuality",
        title: {
          ar: "جودة المياه",
          en: "Water Quality",
        },
        currentValue: 92,
        targetValue: 95,
        unit: "%",
        description: {
          ar: "نقاء 99.8%",
          en: "99.8% Purity",
        },
        status: {
          ar: "ممتاز",
          en: "Excellent",
        },
      },
      {
        id: "vaccination",
        title: {
          ar: "معدل التطعيمات",
          en: "Vaccination Rate",
        },
        currentValue: 96,
        targetValue: 95,
        unit: "%",
        description: {
          ar: "96% من السكان",
          en: "96% of Population",
        },
        status: {
          ar: "عالي",
          en: "High",
        },
      },
      {
        id: "physicalActivity",
        title: {
          ar: "النشاط البدني",
          en: "Physical Activity",
        },
        currentValue: 68,
        targetValue: 80,
        unit: "%",
        description: {
          ar: "68% يمارسون الرياضة",
          en: "68% Exercise Regularly",
        },
        status: {
          ar: "متوسط",
          en: "Medium",
        },
      },
      {
        id: "trafficAccidents",
        title: {
          ar: "الحوادث المرورية",
          en: "Traffic Accidents",
        },
        currentValue: 12,
        targetValue: 10,
        unit: "حادث/شهر",
        description: {
          ar: "12 حادث/شهر",
          en: "12 Accidents/Month",
        },
        status: {
          ar: "منخفض",
          en: "Low",
        },
      },
      {
        id: "recycling",
        title: {
          ar: "إعادة التدوير",
          en: "Recycling",
        },
        currentValue: 74,
        targetValue: 80,
        unit: "%",
        description: {
          ar: "74% من النفايات",
          en: "74% of Waste",
        },
        status: {
          ar: "جيد",
          en: "Good",
        },
      },
    ];

    // Create the health indicators document
    const healthIndicators = new HealthIndicator({
      indicators: defaultIndicators,
    });

    await healthIndicators.save();
    // Health indicators seeded successfully!

    // Close the connection
    await mongoose.connection.close();
    // Database connection closed
  } catch (error) {
    // Error seeding health indicators
    process.exit(1);
  }
};

// Run the seed function if this file is executed directly
if (require.main === module) {
  seedHealthIndicators();
}

module.exports = seedHealthIndicators;
