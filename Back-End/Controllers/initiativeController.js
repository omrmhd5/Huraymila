const Initiative = require("../Models/Initiative");

// Get all initiatives
const getAllInitiatives = async (req, res) => {
  try {
    const initiatives = await Initiative.find()
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
      message: "Error fetching initiatives",
      error: error.message,
    });
  }
};

// Get initiative by ID
const getInitiativeById = async (req, res) => {
  try {
    const { id } = req.params;

    const initiative = await Initiative.findById(id).populate(
      "agency",
      "name email"
    );

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
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Create new initiative
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
    await initiative.populate("agency", "name email");

    res.status(201).json({
      success: true,
      message: "Initiative created successfully",
      data: initiative,
    });
  } catch (error) {
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

    // Find initiative first to check ownership
    const existingInitiative = await Initiative.findById(id);
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
const addVolunteer = async (req, res) => {
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
const removeVolunteer = async (req, res) => {
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

    // Remove volunteer
    initiative.volunteers = initiative.volunteers.filter(
      (vol) => vol._id.toString() !== volunteerId
    );

    await initiative.save();
    await initiative.populate("agency", "name email");

    res.json({
      success: true,
      message: "Volunteer removed successfully",
      data: initiative,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing volunteer",
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
  addVolunteer,
  removeVolunteer,
};
