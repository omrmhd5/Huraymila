const jwt = require("jsonwebtoken");

// General auth middleware (works for both governor and agency)
const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};

// Governor-only protection
const governorOnly = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.type !== "governor") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Governor privileges required.",
      });
    }
    next();
  });
};

// Agency-only protection
const agencyOnly = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.type !== "agency") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Agency privileges required.",
      });
    }
    next();
  });
};

// Flexible protection that allows both governor and agency
const governorOrAgency = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.type !== "governor" && req.user.type !== "agency") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Authentication required.",
      });
    }
    next();
  });
};

module.exports = {
  auth,
  governorOnly,
  agencyOnly,
  governorOrAgency,
};
