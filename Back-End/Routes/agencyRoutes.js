const express = require("express");
const router = express.Router();
const {
  loginAgency,
  getAgencyProfile,
  getAssignedStandards,
  getAgencies,
  getAgencyById,
  createAgency,
  updateAgency,
  deleteAgency,
} = require("../Controllers/agencyController");
const auth = require("../middleware/auth");

// Public routes
router.post("/login", loginAgency);

// Protected routes (require JWT token)
router.get("/profile", auth, getAgencyProfile);
router.get("/assigned-standards", auth, getAssignedStandards);
router.get("/", getAgencies);
router.get("/:id", getAgencyById);
router.post("/", createAgency);
router.put("/:id", updateAgency);
router.delete("/:id", deleteAgency);

module.exports = router;
