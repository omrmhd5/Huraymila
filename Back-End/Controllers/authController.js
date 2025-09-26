const Governor = require("../Models/Governor");
const Agency = require("../Models/Agency");
const jwt = require("jsonwebtoken");

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

    // If user not found in both collections
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
    } else {
      tokenPayload.agencyId = user._id;
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

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: userData,
      type: userType,
      redirectTo: userType === "governor" ? "/admin" : "/agency-dashboard",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};

// Get current user profile (works for both governor and agency)
const getCurrentUser = async (req, res) => {
  try {
    const { type, governorId, agencyId } = req.user;

    let user;
    if (type === "governor" && governorId) {
      user = await Governor.findById(governorId).select("-password");
    } else if (type === "agency" && agencyId) {
      user = await Agency.findById(agencyId)
        .select("-password")
        .populate("assignedStandards");
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
    console.error("Get current user error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user data",
      error: error.message,
    });
  }
};

module.exports = {
  unifiedLogin,
  getCurrentUser,
};
