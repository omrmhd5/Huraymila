const mongoose = require("mongoose");

const smsLogSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Governor", // or dynamically if others can send
      required: true,
    },
    messageBody: {
      type: String,
      required: true,
    },
    recipientCount: {
      type: Number,
      required: true,
    },
    successfulDeliveries: {
      type: Number,
      default: 0,
    },
    failedDeliveries: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    apiResponse: {
      type: Object, // Store raw provider response for debugging
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SmsLog", smsLogSchema);
