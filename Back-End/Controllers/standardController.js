const Standard = require("../Models/Standard");
const Agency = require("../Models/Agency");

// Get all standards
const getStandards = async (req, res) => {
  try {
    const standards = await Standard.find()
      .populate("assigned_agencies", "name name_ar")
      .sort({ number: 1 });

    res.json({
      success: true,
      count: standards.length,
      data: standards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching standards",
      error: error.message,
    });
  }
};

// Get standard by number
const getStandardByNumber = async (req, res) => {
  try {
    const { number } = req.params;
    const standard = await Standard.findOne({ number }).populate(
      "assigned_agencies",
      "name name_ar"
    );

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    res.json({
      success: true,
      data: standard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching standard",
      error: error.message,
    });
  }
};

// Update standard by number
const updateStandard = async (req, res) => {
  try {
    const { number } = req.params;
    const { assigned_agencies, status, progress } = req.body;

    const standard = await Standard.findOneAndUpdate(
      { number },
      { assigned_agencies, status, progress },
      { new: true, runValidators: true }
    ).populate("assigned_agencies", "name name_ar");

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    res.json({
      success: true,
      message: "Standard updated successfully",
      data: standard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating standard",
      error: error.message,
    });
  }
};

// Update standard status and progress based on submissions
const updateStandardFromSubmissions = async (req, res) => {
  try {
    const { number } = req.params;
    const { status, progress } = req.body;

    const standard = await Standard.findOneAndUpdate(
      { number },
      { status, progress },
      { new: true, runValidators: true }
    ).populate("assigned_agencies", "name name_ar");

    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    res.json({
      success: true,
      message: "Standard status and progress updated successfully",
      data: standard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating standard status and progress",
      error: error.message,
    });
  }
};

// Get standards by status
const getStandardsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const standards = await Standard.find({ status })
      .populate("assigned_agencies", "name name_ar")
      .sort({ number: 1 });

    res.json({
      success: true,
      count: standards.length,
      data: standards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching standards by status",
      error: error.message,
    });
  }
};

module.exports = {
  getStandards,
  getStandardByNumber,
  updateStandard,
  updateStandardFromSubmissions,
  getStandardsByStatus,
};
