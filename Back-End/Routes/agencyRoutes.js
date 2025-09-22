const express = require("express");
const router = express.Router();
const {
  getAgencies,
  getAgencyById,
  createAgency,
  updateAgency,
  deleteAgency,
} = require("../Controllers/agencyController");
const auth = require("../middleware/auth");

// Public routes
router.get("/", getAgencies);
router.get("/:id", getAgencyById);

// Protected routes (require JWT token)
router.post("/", auth, createAgency);
router.put("/:id", auth, updateAgency);
router.delete("/:id", auth, deleteAgency);

module.exports = router;
