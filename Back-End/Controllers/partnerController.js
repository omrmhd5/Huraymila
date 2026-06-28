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

exports.createPartner = async (req, res) => {
  try {
    const { name_ar, name_en, order } = req.body;
    if (!name_ar || !name_en) {
      return res.status(400).json({ message: "Arabic and English names are required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Logo file is required" });
    }

    const partnerCount = await Partner.countDocuments();

    const newPartner = new Partner({
      name_ar,
      name_en,
      logo: `/public/uploads/partners/${req.file.filename}`,
      order: order ? parseInt(order) : partnerCount + 1,
    });

    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ message: "Error creating partner", error: error.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      // Delete old logo if it exists and was uploaded
      const oldPartner = await Partner.findById(id);
      if (oldPartner && oldPartner.logo && oldPartner.logo.startsWith("/public/")) {
        const absolutePath = path.join(__dirname, "..", oldPartner.logo);
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
        }
      }
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

exports.deletePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findById(id);
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    // Delete logo file if it exists and starts with /public/
    if (partner.logo && partner.logo.startsWith("/public/")) {
      const absolutePath = path.join(__dirname, "..", partner.logo);
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    }

    await Partner.findByIdAndDelete(id);
    res.json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting partner", error: error.message });
  }
};
