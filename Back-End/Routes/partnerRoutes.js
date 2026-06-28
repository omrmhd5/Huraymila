const express = require("express");
const router = express.Router();
const partnerController = require("../Controllers/partnerController");
const uploadPartnerLogo = require("../middleware/partnerFileUpload");

// Public route to get partners
router.get("/", partnerController.getPartners);

// Create a new partner
router.post("/", uploadPartnerLogo.single("logoFile"), partnerController.createPartner);

// Update partner
router.put("/:id", uploadPartnerLogo.single("logoFile"), partnerController.updatePartner);

// Delete partner
router.delete("/:id", partnerController.deletePartner);

module.exports = router;
