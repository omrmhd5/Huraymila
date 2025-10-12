const HealthIndicator = require("../Models/HealthIndicator");

// Get health indicators (public route)
const getHealthIndicators = async (req, res) => {
  try {
    // Find the single health indicators document
    let healthIndicators = await HealthIndicator.findOne();

    // If no document exists, create one with default values
    if (!healthIndicators) {
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

      healthIndicators = new HealthIndicator({ indicators: defaultIndicators });
      await healthIndicators.save();
    }

    res.json({
      success: true,
      data: healthIndicators,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching health indicators",
      error: error.message,
    });
  }
};

// Update health indicators (governor only)
const updateHealthIndicators = async (req, res) => {
  try {
    const { indicators } = req.body;

    // Validate the indicators array
    if (!Array.isArray(indicators) || indicators.length !== 6) {
      return res.status(400).json({
        success: false,
        message: "Invalid indicators data. Expected array of 6 indicators.",
      });
    }

    // Validate each indicator
    for (const indicator of indicators) {
      if (
        !indicator.id ||
        typeof indicator.currentValue !== "number" ||
        typeof indicator.targetValue !== "number" ||
        indicator.currentValue < 0 ||
        indicator.targetValue < 0
      ) {
        return res.status(400).json({
          success: false,
          message: `Invalid data for indicator ${indicator.id}. currentValue and targetValue must be non-negative numbers.`,
        });
      }
    }

    // Find the existing document
    let healthIndicators = await HealthIndicator.findOne();

    if (!healthIndicators) {
      return res.status(404).json({
        success: false,
        message: "Health indicators not found. Please initialize first.",
      });
    }

    // Update only the currentValue and targetValue for each indicator
    healthIndicators.indicators.forEach((existingIndicator, index) => {
      const newIndicator = indicators.find(
        (ind) => ind.id === existingIndicator.id
      );
      if (newIndicator) {
        existingIndicator.currentValue = newIndicator.currentValue;
        existingIndicator.targetValue = newIndicator.targetValue;
      }
    });

    await healthIndicators.save();

    res.json({
      success: true,
      message: "Health indicators updated successfully",
      data: healthIndicators,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating health indicators",
      error: error.message,
    });
  }
};

module.exports = {
  getHealthIndicators,
  updateHealthIndicators,
};
