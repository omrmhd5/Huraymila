const express = require("express");
const router = express.Router();
const {
  getAllInitiatives,
  getInitiativeById,
  getInitiativesByAgencyId,
  getAgencyInitiatives,
  createInitiative,
  updateInitiative,
  deleteInitiative,
  addVolunteer,
  removeVolunteer,
} = require("../Controllers/initiativeController");
const {
  governorOnly,
  agencyOnly,
  governorOrAgency,
} = require("../middleware/authProtection");

// Public/General routes (protected by governorOrAgency)
router.get("/", governorOrAgency, getAllInitiatives);
router.get("/:id", governorOrAgency, getInitiativeById);

// Agency-specific routes
router.get("/agency/my-initiatives", agencyOnly, getAgencyInitiatives);
router.get("/agency/:agencyId", governorOrAgency, getInitiativesByAgencyId);

// CRUD operations
router.post("/", governorOrAgency, createInitiative);
router.put("/:id", governorOrAgency, updateInitiative);
router.delete("/:id", governorOrAgency, deleteInitiative);

// Volunteer management
router.post("/:id/volunteers", governorOrAgency, addVolunteer);
router.delete(
  "/:id/volunteers/:volunteerId",
  governorOrAgency,
  removeVolunteer
);

module.exports = router;
