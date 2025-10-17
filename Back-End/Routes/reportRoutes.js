const express = require("express");
const router = express.Router();
const {
  createReport,
  getAllReports,
  getMyReports,
  getReportById,
  updateReportStatus,
  deleteReport,
  getReportsStatistics,
} = require("../Controllers/reportController");
const { reportFileUpload } = require("../middleware/reportFileUpload");
const { auth } = require("../middleware/authProtection");

// Public routes - None (all report operations require authentication)

// Volunteer routes (protected)
router.post("/", auth, reportFileUpload, createReport); // Create new report
router.get("/my-reports", auth, getMyReports); // Get my reports

// Admin/Governor routes (protected)
router.get("/", auth, getAllReports); // Get all reports (admin only)
router.get("/statistics", auth, getReportsStatistics); // Get statistics (admin only)
router.get("/:id", auth, getReportById); // Get single report
router.put("/:id/status", auth, updateReportStatus); // Update report status (admin only)
router.delete("/:id", auth, deleteReport); // Delete report

module.exports = router;
