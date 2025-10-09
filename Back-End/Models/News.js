const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
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
    imageUrl: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    priority: {
      type: Number,
      required: false,
      default: null,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
newsSchema.index({ date: -1 });
newsSchema.index({ priority: -1, date: -1 });

module.exports = mongoose.model("News", newsSchema);
