const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      default: null,
      required: false,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: false,
      minlength: 6,
    },
    contactPerson: {
      name: {
        type: String,
        required: false,
        trim: true,
      },
      email: {
        type: String,
        required: false,
        trim: true,
        lowercase: true,
      },
      phoneNumber: {
        type: String,
        required: false,
        trim: true,
      },
    },
    assignedStandards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Standard",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Agency", agencySchema);
