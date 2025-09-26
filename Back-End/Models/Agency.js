const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    type: {
      type: String,
      default: "agency",
      immutable: true,
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

// Hash password before saving
agencySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
agencySchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Agency", agencySchema);
