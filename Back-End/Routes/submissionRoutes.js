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
const {
  governorOnly,
  agencyOnly,
  governorOrAgency,
} = require("../middleware/authProtection");
const { upload } = require("../middleware/fileUpload");

// Create submission (agency)
router.post("/", agencyOnly, upload.array("files", 10), createSubmission);

// Get all submissions (governor only)
router.get("/", governorOnly, getAllSubmissions);

// Get submissions by standard number (governor only)
router.get(
  "/standard/:standardNumber",
  governorOnly,
  getSubmissionsByStandardNumber
);

// Get my submissions (agency)
router.get("/my", agencyOnly, getMySubmissions);

// Get my submissions for a specific standard (agency)
router.get(
  "/standard/:standardNumber/my",
  agencyOnly,
  getMySubmissionsByStandardNumber
);

// Update submission status (governor only)
router.patch("/:id/status", governorOnly, updateSubmissionStatus);

// Update my submission (agency)
router.put("/:id", agencyOnly, upload.array("files", 10), updateMySubmission);

// Download submission file (authenticated users only)
router.get(
  "/:submissionId/files/:filename",
  governorOrAgency,
  downloadSubmissionFile
);

module.exports = router;
