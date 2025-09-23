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

// Protected routes (require JWT token)
router.get("/", getAgencies);
router.get("/:id", getAgencyById);
router.post("/", createAgency);
router.put("/:id", updateAgency);
router.delete("/:id", deleteAgency);

module.exports = router;
