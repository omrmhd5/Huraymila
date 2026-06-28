const express = require("express");
const router = express.Router();
const { sendBroadcast, getSmsLogs } = require("../Controllers/smsController");
const { governorOnly } = require("../middleware/authProtection");

// POST /api/sms/broadcast - Send SMS to all agencies
router.post("/broadcast", governorOnly, sendBroadcast);

// GET /api/sms/logs - Get history of sent SMS
router.get("/logs", governorOnly, getSmsLogs);

module.exports = router;
