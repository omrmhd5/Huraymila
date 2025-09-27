const Submission = require("../Models/Submission");
const Agency = require("../Models/Agency");
const {
  moveFilesToSubmissionFolder,
  cleanupTempFiles,
  deletePhysicalFiles,
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

// Update my submission (agency scoped)
const updateMySubmission = async (req, res) => {
  try {
    const agencyId = req.user?.agencyId;
    const submissionId = req.params.id;

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

    // Find the submission and verify ownership
    const existingSubmission = await Submission.findOne({
      _id: submissionId,
      agency: agencyId,
    });

    if (!existingSubmission) {
      // Clean up any uploaded files
      if (req.files && req.files.length > 0) {
        cleanupTempFiles(req.files);
      }
      return res.status(404).json({
        success: false,
        message: "Submission not found or access denied",
      });
    }

    const { title, description, notes } = req.body;

    // Handle file deletions and new uploads
    let finalFileUrls = [];

    // Keep existing files that are still wanted
    let existingFileUrls = [];
    if (req.body.existingFileUrls) {
      try {
        existingFileUrls = JSON.parse(req.body.existingFileUrls);
        if (Array.isArray(existingFileUrls)) {
          finalFileUrls = [...existingFileUrls];
        }
      } catch (error) {
        console.error("Error parsing existingFileUrls:", error);
      }
    }

    // Find files that were removed and delete them physically
    const currentFileUrls = existingSubmission.filesUrls || [];
    const filesToDelete = currentFileUrls.filter(
      (fileUrl) => !existingFileUrls.includes(fileUrl)
    );

    if (filesToDelete.length > 0) {
      console.log(
        `Deleting ${filesToDelete.length} removed files:`,
        filesToDelete
      );
      deletePhysicalFiles(filesToDelete);
    }

    // Handle new file uploads if any
    if (req.files && req.files.length > 0) {
      try {
        const movedFiles = moveFilesToSubmissionFolder(submissionId, req.files);
        const newFileUrls = movedFiles.map((file) => file.path);
        finalFileUrls = [...finalFileUrls, ...newFileUrls];
      } catch (error) {
        console.error("Error moving files during update:", error);
        cleanupTempFiles(req.files);
        return res.status(500).json({
          success: false,
          message: "Error processing uploaded files",
          error: error.message,
        });
      }
    }

    // Update the submission
    const updatedSubmission = await Submission.findByIdAndUpdate(
      submissionId,
      {
        title,
        description,
        notes,
        filesUrls: finalFileUrls,
        updatedAt: new Date(),
      },
      { new: true }
    );

    const populated = await Submission.findById(updatedSubmission._id).populate(
      "agency",
      "name name_ar email"
    );

    // Update standard status
    try {
      await updateStandardStatus(existingSubmission.standardNumber);
    } catch (error) {
      console.error("Error updating standard status:", error);
      // Don't fail the submission update if standard update fails
    }

    res.json({
      success: true,
      message: "Submission updated successfully",
      data: populated,
    });
  } catch (error) {
    console.error("Error updating submission:", error);
    // Clean up any uploaded files
    if (req.files && req.files.length > 0) {
      cleanupTempFiles(req.files);
    }
    res.status(500).json({
      success: false,
      message: "Error updating submission",
      error: error.message,
    });
  }
};

// Download/view submission file
const downloadSubmissionFile = async (req, res) => {
  try {
    const { submissionId, filename } = req.params;
    const agencyId = req.user?.agencyId;

    // Find the submission and verify access
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }

    // Check if user has access (either owns the submission or is admin)
    const isOwner =
      agencyId && submission.agency.toString() === agencyId.toString();
    const isAdmin = req.user?.role === "admin"; // Assuming you have role-based auth

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Check if file exists in submission
    const fileUrl = `/public/submissions/${submissionId}/${filename}`;
    const fileExists = submission.filesUrls.includes(fileUrl);

    if (!fileExists) {
      return res.status(404).json({
        success: false,
        message: "File not found in submission",
      });
    }

    // Construct file path
    const path = require("path");
    const fs = require("fs");
    const filePath = path.join(
      __dirname,
      "..",
      "submissions",
      submissionId,
      filename
    );

    // Check if file exists on disk
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found on server",
      });
    }

    // Send file
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: "Error downloading file",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error in downloadSubmissionFile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
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
  downloadSubmissionFile,
};
