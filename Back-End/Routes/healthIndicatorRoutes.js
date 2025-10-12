const express = require("express");
const router = express.Router();
const {
  getHealthIndicators,
  updateHealthIndicators,
} = require("../Controllers/healthIndicatorController");
const { governorOnly } = require("../middleware/authProtection");

// Public route
router.get("/", getHealthIndicators);

// Protected routes (governor only)
router.use(governorOnly);

// Governor routes
router.put("/", updateHealthIndicators);

module.exports = router;
