const express = require("express");
const router = express.Router();
const {
  unifiedLogin,
  getCurrentUser,
} = require("../Controllers/authController");
const { auth } = require("../middleware/authProtection");

// Public routes
router.post("/login", unifiedLogin);

// Protected routes
router.get("/me", auth, getCurrentUser);

module.exports = router;
