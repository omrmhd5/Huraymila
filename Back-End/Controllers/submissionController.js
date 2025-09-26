const Submission = require("../Models/Submission");
const Agency = require("../Models/Agency");
const {
  moveFilesToSubmissionFolder,
  cleanupTempFiles,
} = require("../middleware/fileUpload");
const { updateStandardStatus } = require("../utils/standardStatusUpdater");

// Create a new submission (agency scoped)
const createSubmission = async (req, res) => {
  try {
    const agencyId = req.user?.agencyId;

    if (!agencyId) {
      // Clean up any uploaded files
      if (req.files && req.files.length > 0) {
        cleanupTempFiles(req.files);
      }
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { standardNumber, title, description, notes } = req.body;

    if (!standardNumber || !title || !description) {
      // Clean up any uploaded files
      if (req.files && req.files.length > 0) {
        cleanupTempFiles(req.files);
      }
      return res.status(400).json({
        success: false,
        message: "standardNumber, title and description are required",
      });
    }

    // Create submission first
    const newSubmission = await Submission.create({
      standardNumber,
      agency: agencyId,
      title,
      description,
      notes: notes || "",
      filesUrls: [], // Will be updated after moving files
    });

    let filesUrls = [];

    // Handle file uploads if any
    if (req.files && req.files.length > 0) {
      try {
        const movedFiles = moveFilesToSubmissionFolder(
          newSubmission._id.toString(),
          req.files
        );
        filesUrls = movedFiles.map((file) => file.path);

        // Update submission with file URLs
        newSubmission.filesUrls = filesUrls;
        await newSubmission.save();
      } catch (error) {
        // If file moving fails, clean up and delete the submission
        console.error("Error moving files:", error);
        await Submission.findByIdAndDelete(newSubmission._id);
        cleanupTempFiles(req.files);

        return res.status(500).json({
          success: false,
          message: "Error processing uploaded files",
          error: error.message,
        });
      }
    }

    const populated = await newSubmission.populate("agency", "name name_ar");

    // Update standard status and progress
    try {
      await updateStandardStatus(newSubmission.standardNumber);
    } catch (statusUpdateError) {
      console.error("Error updating standard status:", statusUpdateError);
      // Don't fail the submission creation if status update fails
    }

    res.status(201).json({
      success: true,
      message: "Submission created successfully",
      data: populated,
    });
  } catch (error) {
    // Clean up any uploaded files on error
    if (req.files && req.files.length > 0) {
      cleanupTempFiles(req.files);
    }

    res.status(500).json({
      success: false,
      message: "Error creating submission",
      error: error.message,
    });
  }
};

// Get submissions by standard number
const getSubmissionsByStandardNumber = async (req, res) => {
  try {
    const { standardNumber } = req.params;

    const submissions = await Submission.find({ standardNumber })
      .populate("agency", "name name_ar")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching submissions",
      error: error.message,
    });
  }
};

// Get submissions for authenticated agency
const getMySubmissions = async (req, res) => {
  try {
    const agencyId = req.user?.agencyId;

    if (!agencyId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const submissions = await Submission.find({ agency: agencyId })
      .populate("agency", "name name_ar")
      .sort({ updatedAt: -1 });

    res.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching my submissions",
      error: error.message,
    });
  }
};

// Get submissions for authenticated agency filtered by standard number
const getMySubmissionsByStandardNumber = async (req, res) => {
  try {
    const agencyId = req.user?.agencyId;
    const { standardNumber } = req.params;

    if (!agencyId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const submissions = await Submission.find({
      agency: agencyId,
      standardNumber,
    })
      .populate("agency", "name name_ar")
      .sort({ updatedAt: -1 });

    res.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching my submissions for standard",
      error: error.message,
    });
  }
};

// Update submission status
const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate("agency", "name name_ar");

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    // Update standard status and progress after status change
    try {
      await updateStandardStatus(submission.standardNumber);
    } catch (statusUpdateError) {
      console.error("Error updating standard status:", statusUpdateError);
      // Don't fail the status update if standard update fails
    }

    res.json({
      success: true,
      message: "Submission status updated successfully",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating submission status",
      error: error.message,
    });
  }
};

// Update a submission (agency scoped; cannot change status here)
const updateMySubmission = async (req, res) => {
  try {
    const agencyId = req.user?.agencyId;
    const { id } = req.params;
    const { title, description, notes, existingFileUrls } = req.body;

    if (!agencyId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const submission = await Submission.findOne({ _id: id, agency: agencyId });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    if (typeof title === "string") submission.title = title;
    if (typeof description === "string") submission.description = description;
    if (typeof notes === "string") submission.notes = notes;

    // Handle file updates
    let updatedFileUrls = [...(submission.filesUrls || [])];

    // If existingFileUrls is provided, use only those existing files (user may have removed some)
    if (Array.isArray(existingFileUrls)) {
      updatedFileUrls = [...existingFileUrls];
    }

    // Handle new file uploads if any
    if (req.files && req.files.length > 0) {
      try {
        const movedFiles = moveFilesToSubmissionFolder(id, req.files);
        const newFileUrls = movedFiles.map((file) => file.path);
        updatedFileUrls = [...updatedFileUrls, ...newFileUrls];
      } catch (error) {
        console.error("Error moving files:", error);
        // Clean up uploaded files but don't fail the update
        cleanupTempFiles(req.files);
      }
    }

    submission.filesUrls = updatedFileUrls;
    await submission.save();

    const populated = await submission.populate("agency", "name name_ar");

    // Update standard status and progress after submission update
    try {
      await updateStandardStatus(submission.standardNumber);
    } catch (statusUpdateError) {
      console.error("Error updating standard status:", statusUpdateError);
      // Don't fail the submission update if standard update fails
    }

    res.json({
      success: true,
      message: "Submission updated successfully",
      data: populated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating submission",
      error: error.message,
    });
  }
};

// Get all submissions (admin only)
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("agency", "name name_ar email")
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching submissions",
      error: error.message,
    });
  }
};

module.exports = {
  createSubmission,
  getSubmissionsByStandardNumber,
  getMySubmissions,
  getMySubmissionsByStandardNumber,
  updateSubmissionStatus,
  updateMySubmission,
  getAllSubmissions,
};
