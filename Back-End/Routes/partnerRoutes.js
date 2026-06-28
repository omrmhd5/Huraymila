const express = require("express");
const router = express.Router();
const partnerController = require("../Controllers/partnerController");
const uploadPartnerLogo = require("../middleware/partnerFileUpload");

// Public route to get partners
router.get("/", partnerController.getPartners);

// Protected route to update partner (requires governor access, which we can check in the frontend for now, or add an auth middleware if it exists)
// We will use the upload middleware to handle multipart/form-data
router.put("/:id", uploadPartnerLogo.single("logoFile"), partnerController.updatePartner);

module.exports = router;
