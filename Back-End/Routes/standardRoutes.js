const express = require("express");
const router = express.Router();
const {
  getStandards,
  getStandardByNumber,
  updateStandard,
  updateStandardFromSubmissions,
  getStandardsByStatus,
} = require("../Controllers/standardController");
const auth = require("../middleware/auth");

// Public routes
router.get("/", getStandards);
// router.get("/status/:status", getStandardsByStatus);
// router.get("/number/:number", getStandardByNumber);

// Protected routes (require JWT token)
// router.put("/number/:number", updateStandard);
router.patch("/:number/from-submissions", updateStandardFromSubmissions);

module.exports = router;
