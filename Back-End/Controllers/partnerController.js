const Partner = require("../Models/Partner");
const path = require("path");
const fs = require("fs");

exports.getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ order: 1 });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partners", error: error.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.logo = `/public/uploads/partners/${req.file.filename}`;
    }

    const updatedPartner = await Partner.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.json(updatedPartner);
  } catch (error) {
    res.status(500).json({ message: "Error updating partner", error: error.message });
  }
};
