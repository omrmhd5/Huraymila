const mongoose = require("mongoose");

const successStorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    quote: {
      type: String,
      required: true,
      trim: true,
    },
    before: {
      type: String,
      required: true,
      trim: true,
    },
    after: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: Number,
      required: false,
      default: null,
      min: 1,
      max: 5,
    },
    // Approval workflow fields
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "approved", // Governor submissions are auto-approved, volunteer submissions start as pending
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: false, // Optional because governor submissions don't have this
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
successStorySchema.index({ date: -1 });
successStorySchema.index({ priority: -1, date: -1 });

module.exports = mongoose.model("SuccessStory", successStorySchema);
