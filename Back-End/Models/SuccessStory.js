const mongoose = require("mongoose");

const successStorySchema = new mongoose.Schema(
  {
    // Public submitter details
    author: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // Approval workflow
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "approved",
    },
    // Legacy fields – kept optional for backward-compat with old DB documents
    title: { type: String, required: false, trim: true },
    subtitle: { type: String, required: false, trim: true },
    quote: { type: String, required: false, trim: true },
    before: { type: String, required: false, trim: true },
    after: { type: String, required: false, trim: true },
    imageUrl: { type: String, required: false },
    priority: { type: Number, required: false, default: null },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

successStorySchema.index({ date: -1 });

module.exports = mongoose.model("SuccessStory", successStorySchema);
