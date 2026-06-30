const Governor = require("../Models/Governor");
const Agency = require("../Models/Agency");
const Volunteer = require("../Models/Volunteer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendResetPasswordEmail } = require("../Services/emailService");

// Unified login function that checks both Governor and Agency
const unifiedLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // First, try to find in Governor collection
    let user = await Governor.findOne({ email });
    let userType = "governor";

    // If not found in Governor, try Agency collection
    if (!user) {
      user = await Agency.findOne({ email });
      userType = "agency";
    }

    // If not found in Agency, try Volunteer collection
    if (!user) {
      user = await Volunteer.findOne({ email });
      userType = "volunteer";
    }

    // If user not found in all collections
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token with user type
    const tokenPayload = {
      email: user.email,
      type: userType,
    };

    // Add appropriate ID based on user type
    if (userType === "governor") {
      tokenPayload.governorId = user._id;
      // ALSO check if there's an agency with the same email, if so attach agencyId!
      const matchingAgency = await Agency.findOne({ email: user.email });
      if (matchingAgency) {
        tokenPayload.agencyId = matchingAgency._id;
      }
    } else if (userType === "agency") {
      tokenPayload.agencyId = user._id;
    } else if (userType === "volunteer") {
      tokenPayload.volunteerId = user._id;
    }

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Prepare user data for response (excluding password)
    const userData = user.toObject();
    delete userData.password;
    userData.type = userType;

    // If governor, check if there's a matching agency to attach details for frontend
    if (userType === "governor") {
      const matchingAgency = await Agency.findOne({ email: user.email }).populate("assignedStandards");
      if (matchingAgency) {
        userData.assignedStandards = matchingAgency.assignedStandards;
        userData.contactPerson = matchingAgency.contactPerson;
        userData.agencyId = matchingAgency._id;
        userData.isAgency = true;
      }
    }

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: userData,
      type: userType,
      redirectTo:
        userType === "governor"
          ? "/admin"
          : userType === "agency"
          ? "/agency-dashboard"
          : "/volunteer-dashboard",
    });
  } catch (error) {
    // Login error
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};

// Get current user profile (works for governor, agency, and volunteer)
const getCurrentUser = async (req, res) => {
  try {
    const { type, governorId, agencyId, volunteerId } = req.user;

    let user;
    if (type === "governor" && governorId) {
      user = await Governor.findById(governorId).select("-password");
      
      if (user) {
        // Check if there is an agency with the same email
        const matchingAgency = await Agency.findOne({ email: user.email }).populate("assignedStandards");
        if (matchingAgency) {
          // Attach agency details to the user object
          const userObj = user.toObject();
          userObj.assignedStandards = matchingAgency.assignedStandards;
          userObj.contactPerson = matchingAgency.contactPerson;
          userObj.agencyId = matchingAgency._id;
          userObj.isAgency = true; // Flag for frontend
          return res.json({
            success: true,
            user: { ...userObj, type },
          });
        }
      }
    } else if (type === "agency" && agencyId) {
      user = await Agency.findById(agencyId)
        .select("-password")
        .populate("assignedStandards");
    } else if (type === "volunteer" && volunteerId) {
      user = await Volunteer.findById(volunteerId)
        .select("-password")
        .populate(
          "initiatives.initiative",
          "title description status startDate endDate"
        );
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: { ...user.toObject(), type },
    });
  } catch (error) {
    // Get current user error
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
      error: error.message,
    });
  }
};

// Volunteer signup function
const volunteerSignup = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email already exists in any collection
    const existingGovernor = await Governor.findOne({ email });
    const existingAgency = await Agency.findOne({ email });
    const existingVolunteer = await Volunteer.findOne({ email });

    if (existingGovernor || existingAgency || existingVolunteer) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create new volunteer
    const volunteer = new Volunteer({
      fullName,
      email,
      password,
      phoneNumber,
    });

    await volunteer.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        email: volunteer.email,
        type: "volunteer",
        volunteerId: volunteer._id,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Prepare user data for response (excluding password)
    const userData = volunteer.toObject();
    delete userData.password;
    userData.type = "volunteer";

    res.status(201).json({
      success: true,
      message: "Volunteer account created successfully",
      token,
      user: userData,
      type: "volunteer",
      redirectTo: "/volunteer-dashboard",
    });
  } catch (error) {
    // Volunteer signup error
    res.status(500).json({
      success: false,
      message: "Error creating volunteer account",
      error: error.message,
    });
  }
};

// Forgot Password controller
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Try finding the user in all three collections
    let user = await Governor.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await Agency.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      user = await Volunteer.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with that email address",
      });
    }

    // Generate secure random reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    // Hash token and set it on schema with expiry (1 hour)
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send reset link email
    const baseUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    
    await sendResetPasswordEmail(user.email, resetUrl);

    res.json({
      success: true,
      message: "Reset link has been sent to your email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error processing forgot password request",
      error: error.message,
    });
  }
};

// Reset Password controller
const resetPassword = async (req, res) => {
  try {
    const { token, email, password } = req.body;
    
    if (!token || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Token, email, and password are required",
      });
    }

    // Re-hash incoming token to match it against database
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Search user
    let user = await Governor.findOne({
      email: email.toLowerCase(),
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      user = await Agency.findOne({
        email: email.toLowerCase(),
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });
    }

    if (!user) {
      user = await Volunteer.findOne({
        email: email.toLowerCase(),
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password has been successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error resetting password",
      error: error.message,
    });
  }
};

module.exports = {
  unifiedLogin,
  getCurrentUser,
  volunteerSignup,
  forgotPassword,
  resetPassword,
};
