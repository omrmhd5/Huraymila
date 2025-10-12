const mongoose = require("mongoose");

const indicatorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  currentValue: {
    type: Number,
    required: true,
    min: 0,
  },
  targetValue: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
  },
  description: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
  status: {
    ar: { type: String, required: true },
    en: { type: String, required: true },
  },
});

const healthIndicatorSchema = new mongoose.Schema(
  {
    indicators: [indicatorSchema],
  },
  {
    timestamps: true,
  }
);

// Ensure only one document exists (singleton pattern)
healthIndicatorSchema.index({}, { unique: true });

module.exports = mongoose.model("HealthIndicator", healthIndicatorSchema);
