const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    initiatives: [
      {
        initiative: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Initiative",
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
volunteerSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
volunteerSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Hide password when converting to JSON
volunteerSchema.methods.toJSON = function () {
  const volunteer = this.toObject();
  delete volunteer.password;
  return volunteer;
};

module.exports = mongoose.model("Volunteer", volunteerSchema);
