const express = require("express");
const router = express.Router();
const {
  getStandards,
  getStandardByNumber,
  updateStandard,
  updateStandardFromSubmissions,
  getStandardsByStatus,
  toggleAgencyAssignment,
} = require("../Controllers/standardController");
const { governorOnly } = require("../middleware/authProtection");

// Public routes
router.get("/", getStandards);
// router.get("/status/:status", getStandardsByStatus);
// router.get("/number/:number", getStandardByNumber);

// Protected routes (governor only)
// router.put("/number/:number", updateStandard);
router.patch(
  "/:number/from-submissions",
  governorOnly,
  updateStandardFromSubmissions
);
router.patch(
  "/:standardId/agency/:agencyId/toggle",
  governorOnly,
  toggleAgencyAssignment
);

module.exports = router;
