const Agency = require("../Models/Agency");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get all agencies
const getAgencies = async (req, res) => {
  try {
    const agencies = await Agency.find()
      .populate("assignedStandards", "number status progress")
      .sort({ createdAt: -1 });

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

    const agency = await Agency.findById(id).populate(
      "assignedStandards",
      "number status progress"
    );

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
    const { name, email, password, contactPerson, assignedStandards } =
      req.body;

    // Validate required fields
    if (!name || !email || !password || !contactPerson) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate contactPerson fields
    if (
      !contactPerson.name ||
      !contactPerson.email ||
      !contactPerson.phoneNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required contact person fields",
      });
    }

    // Check if agency already exists
    const existingAgency = await Agency.findOne({
      $or: [{ email }, { name }],
    });

    if (existingAgency) {
      return res.status(400).json({
        success: false,
        message: "Agency already exists with this email or name",
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new agency
    const agency = new Agency({
      name,
      email,
      password: hashedPassword,
      contactPerson,
      assignedStandards: assignedStandards || [],
    });

    await agency.save();

    // Populate assigned standards only if there are any
    if (agency.assignedStandards && agency.assignedStandards.length > 0) {
      await agency.populate("assignedStandards", "number status progress");
    }

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
    const { name, email, password, contactPerson, assignedStandards } =
      req.body;

    const updateData = { name, contactPerson, assignedStandards };

    // Only update email if provided and different
    if (email) {
      updateData.email = email;
    }

    // Only hash and update password if provided
    if (password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    const agency = await Agency.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("assignedStandards", "number status progress")
      .select("-password");

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
