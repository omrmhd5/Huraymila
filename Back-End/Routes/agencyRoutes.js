const express = require("express");
const router = express.Router();
const {
  getAgencyProfile,
  getAssignedStandards,
  getAgencies,
  getAgencyById,
  createAgency,
  updateAgency,
  deleteAgency,
} = require("../Controllers/agencyController");
const {
  governorOnly,
  agencyOnly,
  governorOrAgency,
} = require("../middleware/authProtection");

// Protected routes
router.get("/profile", agencyOnly, getAgencyProfile);
router.get("/assigned-standards", agencyOnly, getAssignedStandards);

// Governor-only routes (agency management)
router.get("/", governorOnly, getAgencies);
router.get("/:id", governorOnly, getAgencyById);
router.post("/", governorOnly, createAgency);
router.put("/:id", governorOnly, updateAgency);
router.delete("/:id", governorOnly, deleteAgency);

module.exports = router;
