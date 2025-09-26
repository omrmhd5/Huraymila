const express = require("express");
const router = express.Router();
const {
  createSubmission,
  getSubmissionsByStandardNumber,
  getMySubmissions,
  getMySubmissionsByStandardNumber,
  updateSubmissionStatus,
  updateMySubmission,
  getAllSubmissions,
  downloadSubmissionFile,
} = require("../Controllers/submissionController");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/fileUpload");

// Create submission (agency)
router.post("/", auth, upload.array("files", 10), createSubmission);

// Get all submissions (admin)
router.get("/", getAllSubmissions);

// Get submissions by standard number (public/admin)
router.get("/standard/:standardNumber", getSubmissionsByStandardNumber);

// Get my submissions (agency)
router.get("/my", auth, getMySubmissions);

// Get my submissions for a specific standard (agency)
router.get(
  "/standard/:standardNumber/my",
  auth,
  getMySubmissionsByStandardNumber
);

// Update submission status
router.patch("/:id/status", updateSubmissionStatus);

// Update my submission (agency)
router.put("/:id", auth, upload.array("files", 10), updateMySubmission);

// Download submission file (authenticated users only)
router.get("/:submissionId/files/:filename", auth, downloadSubmissionFile);

module.exports = router;
