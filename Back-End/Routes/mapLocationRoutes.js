const express = require("express");
const router = express.Router();
const {
  getMapLocations,
  getMapLocationCount,
} = require("../Controllers/mapLocationController");

// GET /api/map-locations — public, returns all cached locations from DB
router.get("/", getMapLocations);

// GET /api/map-locations/count — public, returns count
router.get("/count", getMapLocationCount);

module.exports = router;
