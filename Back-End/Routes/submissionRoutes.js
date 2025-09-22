const express = require("express");
const router = express.Router();
const {
  getSubmissionsByStandardNumber,
  updateSubmissionStatus,
} = require("../Controllers/submissionController");

// Get submissions by standard number
router.get("/standard/:standardNumber", getSubmissionsByStandardNumber);

// Update submission status
router.patch("/:id/status", updateSubmissionStatus);

module.exports = router;
