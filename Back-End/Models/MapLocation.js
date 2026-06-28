const mongoose = require("mongoose");

const mapLocationSchema = new mongoose.Schema(
  {
    placeId: {
      type: String,
      sparse: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameEn: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["government", "local", "educational", "security", "health", "public", "custom"],
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
    },
    icon: {
      type: String,
      default: "Building",
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    createdByAgency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MapLocation", mapLocationSchema);
