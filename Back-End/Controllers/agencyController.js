const Agency = require("../Models/Agency");

// Get all agencies
const getAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find().sort({ name: 1 });

    res.json({
      success: true,
      count: agencies.length,
      data: agencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching agencies",
      error: error.message,
    });
  }
};

// Get agency by ID
const getAgencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await Agency.findById(id);

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: "Agency not found",
      });
    }

    res.json({
      success: true,
      data: agency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching agency",
      error: error.message,
    });
  }
};

// Create new agency
const createAgency = async (req, res) => {
  try {
    const { name, name_ar, description, description_ar } = req.body;

    // Check if agency with this name already exists
    const existingAgency = await Agency.findOne({
      $or: [{ name }, { name_ar }],
    });
    if (existingAgency) {
      return res.status(400).json({
        success: false,
        message: "Agency with this name already exists",
      });
    }

    const agency = new Agency({
      name,
      name_ar,
      description,
      description_ar,
    });

    await agency.save();

    res.status(201).json({
      success: true,
      message: "Agency created successfully",
      data: agency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating agency",
      error: error.message,
    });
  }
};

// Update agency by ID
const updateAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, name_ar, description, description_ar } = req.body;

    const agency = await Agency.findByIdAndUpdate(
      id,
      { name, name_ar, description, description_ar },
      { new: true, runValidators: true }
    );

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: "Agency not found",
      });
    }

    res.json({
      success: true,
      message: "Agency updated successfully",
      data: agency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating agency",
      error: error.message,
    });
  }
};

// Delete agency by ID
const deleteAgency = async (req, res) => {
  try {
    const { id } = req.params;

    const agency = await Agency.findByIdAndDelete(id);

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: "Agency not found",
      });
    }

    res.json({
      success: true,
      message: "Agency deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting agency",
      error: error.message,
    });
  }
};

module.exports = {
  getAgencies,
  getAgencyById,
  createAgency,
  updateAgency,
  deleteAgency,
};
