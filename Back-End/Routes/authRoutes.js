const express = require("express");
const router = express.Router();
const {
  unifiedLogin,
  getCurrentUser,
  volunteerSignup,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../Controllers/authController");
const { auth } = require("../middleware/authProtection");

// Public routes
router.post("/login", unifiedLogin);
router.post("/volunteer/signup", volunteerSignup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/me", auth, getCurrentUser);
router.post("/change-password", auth, changePassword);

module.exports = router;
