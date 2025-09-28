const express = require("express");
const router = express.Router();
const {
  unifiedLogin,
  getCurrentUser,
  volunteerSignup,
} = require("../Controllers/authController");
const { auth } = require("../middleware/authProtection");

// Public routes
router.post("/login", unifiedLogin);
router.post("/volunteer/signup", volunteerSignup);

// Protected routes
router.get("/me", auth, getCurrentUser);

module.exports = router;
