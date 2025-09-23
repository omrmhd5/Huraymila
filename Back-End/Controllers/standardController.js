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

// Toggle agency assignment to standard (two-way update)
const toggleAgencyAssignment = async (req, res) => {
  try {
    const { standardId, agencyId } = req.params;
    const { assigned } = req.body; // true to assign, false to unassign

    // Find the standard
    const standard = await Standard.findById(standardId);
    if (!standard) {
      return res.status(404).json({
        success: false,
        message: "Standard not found",
      });
    }

    // Find the agency
    const agency = await Agency.findById(agencyId);
    if (!agency) {
      return res.status(404).json({
        success: false,
        message: "Agency not found",
      });
    }

    // Initialize arrays if they don't exist
    if (!standard.assigned_agencies) {
      standard.assigned_agencies = [];
    }
    if (!agency.assignedStandards) {
      agency.assignedStandards = [];
    }

    if (assigned) {
      // Assign agency to standard
      if (!standard.assigned_agencies.includes(agencyId)) {
        standard.assigned_agencies.push(agencyId);
      }
      // Assign standard to agency
      if (!agency.assignedStandards.includes(standardId)) {
        agency.assignedStandards.push(standardId);
      }
    } else {
      // Remove agency from standard
      standard.assigned_agencies = standard.assigned_agencies.filter(
        (id) => id.toString() !== agencyId
      );
      // Remove standard from agency
      agency.assignedStandards = agency.assignedStandards.filter(
        (id) => id.toString() !== standardId
      );
    }

    // Save both documents
    await Promise.all([standard.save(), agency.save()]);

    // Populate the updated standard
    await standard.populate("assigned_agencies", "name email");

    res.json({
      success: true,
      message: assigned
        ? "Agency assigned to standard successfully"
        : "Agency unassigned from standard successfully",
      data: {
        standard: standard,
        agency: {
          _id: agency._id,
          name: agency.name,
          assignedStandards: agency.assignedStandards,
        },
      },
    });
  } catch (error) {
    console.error("Error toggling agency assignment:", error);
    res.status(500).json({
      success: false,
      message: "Error toggling agency assignment",
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
  toggleAgencyAssignment,
};
