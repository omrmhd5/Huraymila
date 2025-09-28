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
  addVolunteerToInitiative,
  removeVolunteerFromInitiative,
  applyToInitiative,
  withdrawFromInitiative,
} = require("../Controllers/initiativeController");
const {
  governorOnly,
  agencyOnly,
  governorOrAgency,
  volunteerOnly,
} = require("../middleware/authProtection");
const { uploadInitiativeImage } = require("../middleware/initiativeFileUpload");

// Public/General routes
router.get("/", getAllInitiatives);
router.get("/:id", getInitiativeById);

// Agency-specific routes
router.get("/agency/my-initiatives", agencyOnly, getAgencyInitiatives);
router.get("/agency/:agencyId", governorOrAgency, getInitiativesByAgencyId);

// CRUD operations
router.post(
  "/",
  governorOrAgency,
  uploadInitiativeImage.single("image"),
  createInitiative
);
router.put(
  "/:id",
  governorOrAgency,
  uploadInitiativeImage.single("image"),
  updateInitiative
);
router.delete("/:id", governorOrAgency, deleteInitiative);

// Volunteer management (for agencies/governors)
router.post("/:id/volunteers", governorOrAgency, addVolunteerToInitiative);
router.delete(
  "/:id/volunteers/:volunteerId",
  governorOrAgency,
  removeVolunteerFromInitiative
);

// Volunteer application routes (for volunteers)
router.post("/:id/apply", volunteerOnly, applyToInitiative);
router.delete("/:id/withdraw", volunteerOnly, withdrawFromInitiative);

module.exports = router;
