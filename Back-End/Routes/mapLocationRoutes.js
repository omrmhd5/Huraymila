const express = require("express");
const router = express.Router();
const {
  getMapLocations,
  getMapLocationCount,
  createCustomLocation,
  updateCustomLocation,
  deleteCustomLocation,
} = require("../Controllers/mapLocationController");
const { auth } = require("../middleware/authProtection");

// GET /api/map-locations — returns cached locations (seeded, plus custom if authorized agency)
router.get("/", getMapLocations);

// GET /api/map-locations/count — returns count
router.get("/count", getMapLocationCount);

// POST /api/map-locations — create a custom marker (authorized agencies only)
router.post("/", auth, createCustomLocation);

// PUT /api/map-locations/:id — update a custom marker (authorized agencies only)
router.put("/:id", auth, updateCustomLocation);

// DELETE /api/map-locations/:id — delete a custom marker (authorized agencies only)
router.delete("/:id", auth, deleteCustomLocation);

module.exports = router;
