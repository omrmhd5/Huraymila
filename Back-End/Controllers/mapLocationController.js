const MapLocation = require("../Models/MapLocation");
const Agency = require("../Models/Agency");
const jwt = require("jsonwebtoken");

// Helper to check if agency is authorized
const getIsAllowedAgency = async (req) => {
  if (req.user && req.user.type === "agency" && req.user.agencyId) {
    const agency = await Agency.findById(req.user.agencyId);
    return (
      agency &&
      (agency.name === "لجنة الامن و السلامة" ||
        agency.name === "لجنة التنمية الصحية")
    );
  }
  return false;
};

// GET /api/map-locations — returns all cached locations
const getMapLocations = async (req, res) => {
  try {
    let includeCustom = false;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "your-secret-key",
        );
        if (decoded.type === "agency" && decoded.agencyId) {
          const agency = await Agency.findById(decoded.agencyId);
          if (
            agency &&
            (agency.name === "لجنة الامن و السلامة" ||
              agency.name === "لجنة التنمية الصحية")
          ) {
            includeCustom = true;
          }
        }
      } catch (e) {
        // Token decode error, treat as public
      }
    }

    let query = {};
    if (!includeCustom) {
      query = { isCustom: { $ne: true } };
    }

    const locations = await MapLocation.find(query).sort({
      category: 1,
      name: 1,
    });
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

// POST /api/map-locations — create a custom marker (authorized agencies only)
const createCustomLocation = async (req, res) => {
  try {
    const isAllowed = await getIsAllowedAgency(req);
    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only specific agencies can create custom markers.",
      });
    }

    const { name, nameEn, lat, lng, address } = req.body;
    if (!name || !lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Name, lat, and lng are required",
      });
    }

    // Generate a unique placeId to satisfy any database unique constraint on placeId
    const placeId = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newLocation = new MapLocation({
      placeId,
      name,
      nameEn: nameEn || name,
      category: "custom",
      lat: Number(lat),
      lng: Number(lng),
      address: address || "",
      icon: "Home",
      isCustom: true,
      createdByAgency: req.user.agencyId,
    });

    await newLocation.save();

    res.status(201).json({
      success: true,
      data: newLocation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating custom location",
      error: error.message,
    });
  }
};

// PUT /api/map-locations/:id — update a custom marker (authorized agencies only)
const updateCustomLocation = async (req, res) => {
  try {
    const isAllowed = await getIsAllowedAgency(req);
    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only specific agencies can modify custom markers.",
      });
    }

    const { name, nameEn, lat, lng, address } = req.body;
    const location = await MapLocation.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    if (!location.isCustom) {
      return res.status(400).json({
        success: false,
        message: "Cannot modify seeded locations.",
      });
    }

    if (name) location.name = name;
    if (nameEn) location.nameEn = nameEn;
    if (lat) location.lat = Number(lat);
    if (lng) location.lng = Number(lng);
    if (address !== undefined) location.address = address;

    await location.save();

    res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating custom location",
      error: error.message,
    });
  }
};

// DELETE /api/map-locations/:id — delete a custom marker (authorized agencies only)
const deleteCustomLocation = async (req, res) => {
  try {
    const isAllowed = await getIsAllowedAgency(req);
    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. Only specific agencies can delete custom markers.",
      });
    }

    const location = await MapLocation.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    if (!location.isCustom) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete seeded locations.",
      });
    }

    await MapLocation.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Custom location deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting custom location",
      error: error.message,
    });
  }
};

module.exports = {
  getMapLocations,
  getMapLocationCount,
  createCustomLocation,
  updateCustomLocation,
  deleteCustomLocation,
};
