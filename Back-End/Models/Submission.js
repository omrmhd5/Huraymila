const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    standardNumber: {
      type: Number,
      required: true,
    },
    agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    filesUrls: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Submission", submissionSchema);
