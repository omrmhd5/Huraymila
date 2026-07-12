const mongoose = require("mongoose");

const standardSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    standard_ar: {
      type: String,
      required: true,
    },
    standard_en: {
      type: String,
      required: true,
    },
    requirements_ar: {
      type: [String],
      default: [],
    },
    requirements_en: {
      type: [String],
      default: [],
    },
    assigned_agencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
      },
    ],
    status: {
      type: String,
      enum: ["approved", "rejected", "pending_approval", "didnt_submit"],
      default: "didnt_submit",
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Standard", standardSchema);
