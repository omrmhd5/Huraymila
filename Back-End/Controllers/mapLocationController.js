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
        if (decoded.type === "governor") {
          includeCustom = true;
        } else if (decoded.type === "agency" && decoded.agencyId) {
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

// POST /api/map-locations — create a custom marker (authorized agencies and governor)
const createCustomLocation = async (req, res) => {
  try {
    const isGovernor = req.user && req.user.type === "governor";
    const isAgency = req.user && req.user.type === "agency" && req.user.agencyId;
    
    let isAllowed = false;
    
    if (isGovernor) {
      isAllowed = true;
    } else if (isAgency) {
      const agency = await Agency.findById(req.user.agencyId);
      if (agency && (agency.name === "لجنة الامن و السلامة" || agency.name === "لجنة التنمية الصحية")) {
        isAllowed = true;
      }
    }

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not authorized to create markers.",
      });
    }

    const { name, nameEn, lat, lng, address, category } = req.body;
    if (!name || !lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Name, lat, and lng are required",
      });
    }

    const placeId = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Governor can choose any category except "custom". If not provided, default to "public".
    // Agency is forced to use "custom" category.
    let finalCategory = "custom";
    if (isGovernor) {
      finalCategory = category || "public";
      if (finalCategory === "custom") {
        finalCategory = "public"; // Governor shouldn't create custom agency category pins
      }
    }

    const newLocation = new MapLocation({
      placeId,
      name,
      nameEn: nameEn || name,
      category: finalCategory,
      lat: Number(lat),
      lng: Number(lng),
      address: address || "",
      icon: isGovernor ? "MapPin" : "Home",
      isCustom: true,
      createdByAgency: isAgency ? req.user.agencyId : null,
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

// PUT /api/map-locations/:id — update a custom marker
const updateCustomLocation = async (req, res) => {
  try {
    const isGovernor = req.user && req.user.type === "governor";
    const location = await MapLocation.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    let isAllowed = false;

    if (location.category === "custom") {
      // Owner agency OR governor can edit custom pins
      if (isGovernor) {
        isAllowed = true;
      } else if (req.user && req.user.type === "agency" && String(location.createdByAgency) === String(req.user.agencyId)) {
        isAllowed = true;
      }
    } else {
      // Any other category pin: only Governor can customize/edit
      if (isGovernor) {
        isAllowed = true;
      }
    }

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not authorized to modify this location.",
      });
    }

    const { name, nameEn, lat, lng, address, category } = req.body;

    if (name) location.name = name;
    if (nameEn) location.nameEn = nameEn;
    if (lat) location.lat = Number(lat);
    if (lng) location.lng = Number(lng);
    if (address !== undefined) location.address = address;
    
    // Governor can change the category of standard pins
    if (isGovernor && category && category !== "custom") {
      location.category = category;
    }

    // Set isCustom to true if edited by governor to mark it modified
    if (isGovernor) {
      location.isCustom = true;
    }

    await location.save();

    res.json({
      success: true,
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating location",
      error: error.message,
    });
  }
};

// DELETE /api/map-locations/:id — delete a custom marker
const deleteCustomLocation = async (req, res) => {
  try {
    const isGovernor = req.user && req.user.type === "governor";
    const location = await MapLocation.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    let isAllowed = false;

    if (location.category === "custom") {
      // Owner agency OR governor can delete custom pins
      if (isGovernor) {
        isAllowed = true;
      } else if (req.user && req.user.type === "agency" && String(location.createdByAgency) === String(req.user.agencyId)) {
        isAllowed = true;
      }
    } else {
      // Any other category pin: only Governor can delete
      if (isGovernor) {
        isAllowed = true;
      }
    }

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not authorized to delete this location.",
      });
    }

    await MapLocation.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting location",
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
