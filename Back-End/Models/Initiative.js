const mongoose = require("mongoose");

const initiativeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["gathering volunteers", "active", "completed", "cancelled"],
      default: "gathering volunteers",
    },
    currentVolunteers: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxVolunteers: {
      type: Number,
      required: true,
      min: 1,
    },
    agency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    volunteers: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: false,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Update currentVolunteers when volunteers array changes
initiativeSchema.pre("save", function (next) {
  this.currentVolunteers = this.volunteers.length;
  next();
});

// Validate that endDate is after startDate
initiativeSchema.pre("save", function (next) {
  if (this.endDate <= this.startDate) {
    next(new Error("End date must be after start date"));
  }
  next();
});

module.exports = mongoose.model("Initiative", initiativeSchema);
