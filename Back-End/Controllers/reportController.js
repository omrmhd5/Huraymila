const Report = require("../Models/Report");
const Volunteer = require("../Models/Volunteer");
const {
  moveFilesToReportFolder,
  cleanupTempFiles,
  deleteReportFiles,
  deleteReportFolder,
} = require("../middleware/reportFileUpload");

// Create a new report (volunteer only)
const createReport = async (req, res) => {
  try {
    const volunteerId = req.user?.volunteerId;

    if (!volunteerId) {
      // Clean up any uploaded files
      if (req.files && req.files.length > 0) {
        cleanupTempFiles(req.files);
      }
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Volunteers only",
      });
    }

    const { title, details } = req.body;

    if (!title || !details) {
      // Clean up any uploaded files
      if (req.files && req.files.length > 0) {
        cleanupTempFiles(req.files);
      }
      return res.status(400).json({
        success: false,
        message: "Title and details are required",
      });
    }

    // Create report first
    const newReport = await Report.create({
      volunteer: volunteerId,
      title,
      details,
      filesUrls: [], // Will be updated after moving files
      status: "pending",
    });

    let filesUrls = [];

    // Handle file uploads if any
    if (req.files && req.files.length > 0) {
      try {
        const movedFiles = moveFilesToReportFolder(
          newReport._id.toString(),
          req.files
        );
        filesUrls = movedFiles.map((file) => file.path);

        // Update report with file URLs
        newReport.filesUrls = filesUrls;
        await newReport.save();
      } catch (error) {
        // If file moving fails, clean up and delete the report
        // Error moving files
        await Report.findByIdAndDelete(newReport._id);
        cleanupTempFiles(req.files);

        return res.status(500).json({
          success: false,
          message: "Error processing uploaded files",
          error: error.message,
        });
      }
    }

    const populated = await Report.findById(newReport._id).populate(
      "volunteer",
      "fullName email phoneNumber"
    );

    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      data: populated,
    });
  } catch (error) {
    // Clean up any uploaded files on error
    if (req.files && req.files.length > 0) {
      cleanupTempFiles(req.files);
    }

    // Error creating report
    res.status(500).json({
      success: false,
      message: "Error creating report",
      error: error.message,
    });
  }
};

// Get all reports (admin/governor only)
const getAllReports = async (req, res) => {
  try {
    const { status } = req.query;

    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    const reports = await Report.find(query)
      .populate("volunteer", "fullName email phoneNumber")
      .populate("reviewedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    // Error fetching reports
    res.status(500).json({
      success: false,
      message: "Error fetching reports",
      error: error.message,
    });
  }
};

// Get reports for authenticated volunteer
const getMyReports = async (req, res) => {
  try {
    const volunteerId = req.user?.volunteerId;

    if (!volunteerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const reports = await Report.find({ volunteer: volunteerId })
      .populate("reviewedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    // Error fetching my reports
    res.status(500).json({
      success: false,
      message: "Error fetching your reports",
      error: error.message,
    });
  }
};

// Get single report by ID
const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteerId = req.user?.volunteerId;
    const isGovernor = req.user?.type === "governor";

    const report = await Report.findById(id)
      .populate("volunteer", "fullName email phoneNumber")
      .populate("reviewedBy", "fullName email");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Check access rights - volunteer can only see their own reports
    if (
      !isGovernor &&
      report.volunteer._id.toString() !== volunteerId?.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    // Error fetching report
    res.status(500).json({
      success: false,
      message: "Error fetching report",
      error: error.message,
    });
  }
};

// Update report status (admin/governor only)
const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const reviewerId = req.user?.governorId || req.user?.adminId;

    if (!reviewerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updateData = {
      status,
      reviewedBy: reviewerId,
      reviewedAt: new Date(),
    };

    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    const report = await Report.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("volunteer", "fullName email phoneNumber")
      .populate("reviewedBy", "fullName email");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.json({
      success: true,
      message: "Report status updated successfully",
      data: report,
    });
  } catch (error) {
    // Error updating report status
    res.status(500).json({
      success: false,
      message: "Error updating report status",
      error: error.message,
    });
  }
};

// Delete report (admin only or volunteer if still pending)
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteerId = req.user?.volunteerId;
    const isGovernor = req.user?.type === "governor";

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Check permissions
    const isOwner =
      volunteerId && report.volunteer.toString() === volunteerId.toString();
    const canDelete = isGovernor || (isOwner && report.status === "pending");

    if (!canDelete) {
      return res.status(403).json({
        success: false,
        message: "You can only delete pending reports",
      });
    }

    // Delete associated files
    if (report.filesUrls && report.filesUrls.length > 0) {
      deleteReportFolder(report._id.toString());
    }

    // Delete report from database
    await Report.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    // Error deleting report
    res.status(500).json({
      success: false,
      message: "Error deleting report",
      error: error.message,
    });
  }
};

// Get reports statistics (admin only)
const getReportsStatistics = async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const pendingReports = await Report.countDocuments({ status: "pending" });
    const underReviewReports = await Report.countDocuments({
      status: "under review",
    });
    const resolvedReports = await Report.countDocuments({ status: "resolved" });
    const rejectedReports = await Report.countDocuments({ status: "rejected" });

    res.json({
      success: true,
      data: {
        total: totalReports,
        pending: pendingReports,
        underReview: underReviewReports,
        resolved: resolvedReports,
        rejected: rejectedReports,
      },
    });
  } catch (error) {
    // Error fetching report statistics
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getMyReports,
  getReportById,
  updateReportStatus,
  deleteReport,
  getReportsStatistics,
};
