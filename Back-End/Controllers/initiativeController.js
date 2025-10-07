const Initiative = require("../Models/Initiative");
const Volunteer = require("../Models/Volunteer");
const {
  moveImageToInitiativeFolder,
  deleteInitiativeImage,
  deleteInitiativeFolder,
  cleanupTempFiles,
} = require("../middleware/initiativeFileUpload");

// Get all initiatives
const getAllInitiatives = async (req, res) => {
  try {
    const initiatives = await Initiative.find()
      .populate("agency", "name email")
      .populate("volunteers.volunteer", "fullName email phoneNumber")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: initiatives.length,
      data: initiatives,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching initiatives",
      error: error.message,
    });
  }
};

// Get initiative by ID
const getInitiativeById = async (req, res) => {
  try {
    const { id } = req.params;

    const initiative = await Initiative.findById(id)
      .populate("agency", "name email")
      .populate("volunteers.volunteer", "fullName email phoneNumber");

    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    res.json({
      success: true,
      data: initiative,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching initiative",
      error: error.message,
    });
  }
};

// Get initiatives by agency ID
const getInitiativesByAgencyId = async (req, res) => {
  try {
    const { agencyId } = req.params;

    const initiatives = await Initiative.find({ agency: agencyId })
      .populate("agency", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: initiatives.length,
      data: initiatives,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching agency initiatives",
      error: error.message,
    });
  }
};

// Get initiatives for current agency (protected route)
const getAgencyInitiatives = async (req, res) => {
  try {
    const agencyId = req.user.agencyId;

    const initiatives = await Initiative.find({ agency: agencyId })
      .populate("agency", "name email")
      .populate("volunteers.volunteer", "fullName email phoneNumber")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: initiatives.length,
      data: initiatives,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your initiatives",
      error: error.message,
    });
  }
};

// Create new initiative
const createInitiative = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      status,
      maxVolunteers,
      volunteers,
    } = req.body;

    // Get agency ID from authenticated user or request body (for governor)
    let agencyId;
    if (req.user.type === "agency") {
      agencyId = req.user.agencyId;
    } else if (req.user.type === "governor" && req.body.agencyId) {
      agencyId = req.body.agencyId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Agency ID is required",
      });
    }

    // Validate required fields
    if (!title || !description || !startDate || !endDate || !maxVolunteers) {
      // Clean up uploaded file if validation fails
      if (req.file) {
        cleanupTempFiles(req.file);
      }
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      // Clean up uploaded file if validation fails
      if (req.file) {
        cleanupTempFiles(req.file);
      }
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Create new initiative first to get the ID
    const initiative = new Initiative({
      title,
      description,
      startDate: start,
      endDate: end,
      status: status || "gathering volunteers",
      maxVolunteers,
      agency: agencyId,
      volunteers: volunteers || [],
    });

    await initiative.save();

    // Handle image upload if provided
    if (req.file) {
      try {
        // Move image to initiative-specific folder
        const imageUrl = moveImageToInitiativeFolder(
          initiative._id.toString(),
          req.file
        );
        // Update initiative with image URL
        initiative.imageUrl = imageUrl;
        await initiative.save();
      } catch (error) {
        // If image moving fails, clean up and delete the initiative
        console.error("Error moving image:", error);
        await Initiative.findByIdAndDelete(initiative._id);
        cleanupTempFiles(req.file);

        return res.status(500).json({
          success: false,
          message: "Error processing uploaded image",
          error: error.message,
        });
      }
    }

    await initiative.populate("agency", "name email");

    res.status(201).json({
      success: true,
      message: "Initiative created successfully",
      data: initiative,
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (req.file) {
      cleanupTempFiles(req.file);
    }

    res.status(500).json({
      success: false,
      message: "Error creating initiative",
      error: error.message,
    });
  }
};

// Update initiative by ID
const updateInitiative = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      startDate,
      endDate,
      status,
      maxVolunteers,
      volunteers,
    } = req.body;

    // Find initiative first to check ownership
    const existingInitiative = await Initiative.findById(id);
    if (!existingInitiative) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    // Check if user has permission to update
    if (
      req.user.type === "agency" &&
      existingInitiative.agency.toString() !== req.user.agencyId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own initiatives",
      });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined) updateData.endDate = new Date(endDate);
    if (status !== undefined) updateData.status = status;
    if (maxVolunteers !== undefined) updateData.maxVolunteers = maxVolunteers;
    if (volunteers !== undefined) updateData.volunteers = volunteers;

    // Handle image upload
    if (req.file) {
      try {
        // Delete old image if it exists
        if (existingInitiative.imageUrl) {
          deleteInitiativeImage(existingInitiative.imageUrl);
        }
        // Move new image to initiative-specific folder
        const imageUrl = moveImageToInitiativeFolder(id, req.file);
        updateData.imageUrl = imageUrl;
      } catch (error) {
        // Clean up uploaded file if moving fails
        cleanupTempFiles(req.file);
        return res.status(500).json({
          success: false,
          message: "Error processing uploaded image",
          error: error.message,
        });
      }
    }

    // Validate dates if both are provided
    if (updateData.startDate && updateData.endDate) {
      if (updateData.endDate <= updateData.startDate) {
        return res.status(400).json({
          success: false,
          message: "End date must be after start date",
        });
      }
    }

    const initiative = await Initiative.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("agency", "name email");

    res.json({
      success: true,
      message: "Initiative updated successfully",
      data: initiative,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating initiative",
      error: error.message,
    });
  }
};

// Delete initiative by ID
const deleteInitiative = async (req, res) => {
  try {
    const { id } = req.params;

    // Find initiative first to check ownership and populate volunteer details
    const existingInitiative = await Initiative.findById(id)
      .populate("volunteers.volunteer", "fullName email phoneNumber")
      .populate("agency", "name email");

    if (!existingInitiative) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    // Check if user has permission to delete
    if (
      req.user.type === "agency" &&
      existingInitiative.agency.toString() !== req.user.agencyId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own initiatives",
      });
    }

    // Remove initiative from all associated volunteers' records
    const volunteerIds = existingInitiative.volunteers
      .filter((vol) => vol.volunteer)
      .map((vol) => vol.volunteer._id);

    if (volunteerIds.length > 0) {
      await Volunteer.updateMany(
        { _id: { $in: volunteerIds } },
        { $pull: { initiatives: { initiative: id } } }
      );
    }

    // Delete entire initiative folder (including image)
    deleteInitiativeFolder(id);

    // Delete the initiative document
    await Initiative.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Initiative deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting initiative",
      error: error.message,
    });
  }
};

// Add volunteer to initiative
const addVolunteerToInitiative = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Volunteer name and email are required",
      });
    }

    const initiative = await Initiative.findById(id);
    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    // Check if already at max capacity
    if (initiative.volunteers.length >= initiative.maxVolunteers) {
      return res.status(400).json({
        success: false,
        message: "Initiative is at maximum volunteer capacity",
      });
    }

    // Check if volunteer already exists
    const existingVolunteer = initiative.volunteers.find(
      (vol) => vol.email === email
    );
    if (existingVolunteer) {
      return res.status(400).json({
        success: false,
        message: "Volunteer already registered for this initiative",
      });
    }

    // Add volunteer
    initiative.volunteers.push({
      name,
      email,
      phone,
      joinedAt: new Date(),
    });

    await initiative.save();
    await initiative.populate("agency", "name email");

    res.json({
      success: true,
      message: "Volunteer added successfully",
      data: initiative,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding volunteer",
      error: error.message,
    });
  }
};

// Remove volunteer from initiative
const removeVolunteerFromInitiative = async (req, res) => {
  try {
    const { id, volunteerId } = req.params;

    const initiative = await Initiative.findById(id);
    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    // Check if user has permission to remove volunteer
    if (
      req.user.type === "agency" &&
      initiative.agency.toString() !== req.user.agencyId
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only manage your own initiatives",
      });
    }

    // Find the volunteer entry in the initiative
    const volunteerEntry = initiative.volunteers.find(
      (vol) =>
        vol._id.toString() === volunteerId ||
        vol.volunteer?.toString() === volunteerId
    );

    if (!volunteerEntry) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found in this initiative",
      });
    }

    // Get the actual volunteer ID (the volunteer document ID)
    const actualVolunteerId = volunteerEntry.volunteer || volunteerId;

    // Find the volunteer document
    const volunteer = await Volunteer.findById(actualVolunteerId);
    if (volunteer) {
      // Remove initiative from volunteer's initiatives array
      volunteer.initiatives = volunteer.initiatives.filter(
        (init) => init.initiative.toString() !== id
      );
      await volunteer.save();
    }

    // Remove volunteer from initiative
    initiative.volunteers = initiative.volunteers.filter(
      (vol) => vol._id.toString() !== volunteerId
    );

    await initiative.save();
    await initiative.populate("agency", "name email");
    await initiative.populate(
      "volunteers.volunteer",
      "fullName email phoneNumber"
    );

    res.json({
      success: true,
      message: "Volunteer removed successfully",
      data: initiative,
    });
  } catch (error) {
    console.error("Error removing volunteer:", error);
    res.status(500).json({
      success: false,
      message: "Error removing volunteer",
      error: error.message,
    });
  }
};

// Apply to initiative (for volunteers)
const applyToInitiative = async (req, res) => {
  try {
    const { id: initiativeId } = req.params;
    const { volunteerId } = req.user;

    // Find the initiative
    const initiative = await Initiative.findById(initiativeId);
    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    // Find the volunteer
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    // Check if initiative is accepting volunteers
    if (
      initiative.status !== "gathering volunteers" &&
      initiative.status !== "active"
    ) {
      return res.status(400).json({
        success: false,
        message: "This initiative is not accepting volunteers",
      });
    }

    // Check if volunteer is already applied
    const isAlreadyApplied = initiative.volunteers.some(
      (vol) => vol.volunteer.toString() === volunteerId
    );

    if (isAlreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this initiative",
      });
    }

    // Check if initiative has reached maximum volunteers
    if (initiative.volunteers.length >= initiative.maxVolunteers) {
      return res.status(400).json({
        success: false,
        message: "This initiative has reached maximum capacity",
      });
    }

    // Add volunteer to initiative
    initiative.volunteers.push({
      volunteer: volunteerId,
      joinedAt: new Date(),
    });

    // Add initiative to volunteer
    volunteer.initiatives.push({
      initiative: initiativeId,
      joinedAt: new Date(),
    });

    // Save both documents
    await initiative.save();
    await volunteer.save();

    // Populate volunteer details for response
    await initiative.populate(
      "volunteers.volunteer",
      "fullName email phoneNumber"
    );

    res.json({
      success: true,
      message: "Successfully applied to initiative",
      data: {
        initiative,
        volunteer: {
          id: volunteer._id,
          fullName: volunteer.fullName,
          email: volunteer.email,
        },
      },
    });
  } catch (error) {
    console.error("Error applying to initiative:", error);
    res.status(500).json({
      success: false,
      message: "Error applying to initiative",
      error: error.message,
    });
  }
};

// Withdraw from initiative (for volunteers)
const withdrawFromInitiative = async (req, res) => {
  try {
    const { id: initiativeId } = req.params;
    const { volunteerId } = req.user;

    // Find the initiative
    const initiative = await Initiative.findById(initiativeId);
    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: "Initiative not found",
      });
    }

    // Find the volunteer
    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    // Find volunteer in initiative
    const volunteerIndex = initiative.volunteers.findIndex(
      (vol) => vol.volunteer.toString() === volunteerId
    );

    if (volunteerIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "You are not registered for this initiative",
      });
    }

    // Find initiative in volunteer
    const initiativeIndex = volunteer.initiatives.findIndex(
      (init) => init.initiative.toString() === initiativeId
    );

    // Remove volunteer from initiative
    initiative.volunteers.splice(volunteerIndex, 1);

    // Remove initiative from volunteer
    if (initiativeIndex !== -1) {
      volunteer.initiatives.splice(initiativeIndex, 1);
    }

    // Save both documents
    await initiative.save();
    await volunteer.save();

    res.json({
      success: true,
      message: "Successfully withdrawn from initiative",
      data: initiative,
    });
  } catch (error) {
    console.error("Error withdrawing from initiative:", error);
    res.status(500).json({
      success: false,
      message: "Error withdrawing from initiative",
      error: error.message,
    });
  }
};

module.exports = {
  getAllInitiatives,
  getInitiativeById,
  getInitiativesByAgencyId,
  getAgencyInitiatives,
  createInitiative,
  updateInitiative,
  deleteInitiative,
  addVolunteerToInitiative,
  removeVolunteerFromInitiative,
  applyToInitiative,
  withdrawFromInitiative,
};
