const MapLocation = require("../Models/MapLocation");

// GET /api/map-locations — returns all cached locations
const getMapLocations = async (req, res) => {
  try {
    const locations = await MapLocation.find().sort({ category: 1, name: 1 });
    res.json({
      success: true,
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching map locations",
      error: error.message,
    });
  }
};

// GET /api/map-locations/count
const getMapLocationCount = async (req, res) => {
  try {
    const count = await MapLocation.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error counting map locations",
      error: error.message,
    });
  }
};

module.exports = {
  getMapLocations,
  getMapLocationCount,
};
