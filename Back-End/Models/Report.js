const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    // Public contact form fields
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: false,
    },
    details: {
      type: String,
      required: true,
    },
    // Optional volunteer reference (for volunteer-submitted reports)
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: false,
    },
    // Legacy fields – kept optional for backward compat
    title: { type: String, required: false },
    filesUrls: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "under review", "resolved", "rejected"],
      default: "pending",
    },
    adminNotes: { type: String, default: "" },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Governor",
    },
    reviewedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);
