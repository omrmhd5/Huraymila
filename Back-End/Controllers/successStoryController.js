const SuccessStory = require("../Models/SuccessStory");
const {
  moveImageToSuccessStoryFolder,
  deleteSuccessStoryImage,
  deleteSuccessStoryFolder,
  cleanupTempFiles,
} = require("../middleware/successStoryFileUpload");

// Get all success stories (only approved for public)
const getAllSuccessStories = async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    // Only show approved success stories to public
    const successStories = await SuccessStory.find({
      approvalStatus: "approved",
    })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await SuccessStory.countDocuments({
      approvalStatus: "approved",
    });

    res.json({
      success: true,
      count: successStories.length,
      total,
      data: successStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching success stories",
      error: error.message,
    });
  }
};

// Get single success story by ID
const getSuccessStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const successStory = await SuccessStory.findById(id);

    if (!successStory) {
      return res.status(404).json({
        success: false,
        message: "Success story not found",
      });
    }

    res.json({
      success: true,
      data: successStory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching success story",
      error: error.message,
    });
  }
};

// Create new success story (governor only - auto-approved)
const createSuccessStory = async (req, res) => {
  try {
    const { author, email, phone, description, date } = req.body;

    if (!author || !description) {
      return res.status(400).json({
        success: false,
        message: "Author and description are required",
      });
    }

    const successStory = new SuccessStory({
      author,
      email: email || "",
      phone: phone || "",
      description,
      date: date || new Date(),
      approvalStatus: "approved",
    });

    await successStory.save();

    res.status(201).json({
      success: true,
      message: "Success story created successfully",
      data: successStory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating success story",
      error: error.message,
    });
  }
};

// Submit success story by volunteer (requires approval)
const submitSuccessStoryByVolunteer = async (req, res) => {
  try {
    const { title, subtitle, description, date, quote, before, after } =
      req.body;

    // Validate required fields (author is no longer required from client)
    if (!title || !subtitle || !description || !quote || !before || !after) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Fetch volunteer information to get fullName
    const Volunteer = require("../Models/Volunteer");
    const volunteer = await Volunteer.findById(req.user.volunteerId);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer not found",
      });
    }

    // Create success story data with volunteer's fullName as author
    const successStoryData = {
      title,
      subtitle,
      description,
      author: volunteer.fullName, // Automatically set from volunteer's fullName
      date: date || new Date(),
      quote,
      before,
      after,
      approvalStatus: "pending", // Volunteer submissions need approval
      submittedBy: req.user.volunteerId, // From auth middleware
    };

    // Create success story
    const successStory = new SuccessStory(successStoryData);
    await successStory.save();

    // Handle image upload if provided
    if (req.file) {
      try {
        const imageUrl = moveImageToSuccessStoryFolder(
          successStory._id.toString(),
          req.file
        );
        successStory.imageUrl = imageUrl;
        await successStory.save();
      } catch (imageError) {
        // Error handling image upload
        // Clean up temp file
        cleanupTempFiles([req.file]);
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
          error: imageError.message,
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "Success story submitted successfully and is pending approval",
      data: successStory,
    });
  } catch (error) {
    // Error submitting success story
    res.status(500).json({
      success: false,
      message: "Error submitting success story",
      error: error.message,
    });
  }
};

// Update success story
const updateSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, email, phone, description, date } = req.body;

    const successStory = await SuccessStory.findById(id);
    if (!successStory) {
      return res.status(404).json({
        success: false,
        message: "Success story not found",
      });
    }

    const updateData = {};
    if (author) updateData.author = author;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (description) updateData.description = description;
    if (date && date !== "undefined") updateData.date = date;

    const updatedSuccessStory = await SuccessStory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Success story updated successfully",
      data: updatedSuccessStory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating success story",
      error: error.message,
    });
  }
};

// Delete success story
const deleteSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;

    const successStory = await SuccessStory.findById(id);
    if (!successStory) {
      return res.status(404).json({
        success: false,
        message: "Success story not found",
      });
    }

    // Delete success story folder and all its contents
    deleteSuccessStoryFolder(id);

    // Delete success story from database
    await SuccessStory.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Success story deleted successfully",
    });
  } catch (error) {
    // Error deleting success story
    res.status(500).json({
      success: false,
      message: "Error deleting success story",
      error: error.message,
    });
  }
};

// Get recent success stories for home page (sorted by date)
const getPrioritizedSuccessStories = async (req, res) => {
  try {
    const { limit = 3 } = req.query;

    const successStories = await SuccessStory.find({ approvalStatus: "approved" })
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: successStories.length,
      data: successStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching success stories",
      error: error.message,
    });
  }
};

// Get available priorities
const getAvailablePriorities = async (req, res) => {
  try {
    const { excludeId } = req.query;

    // Get all priorities currently in use
    const query = {};
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const usedSuccessStories = await SuccessStory.find(query, { priority: 1 });
    const usedPriorityNumbers = usedSuccessStories
      .map((story) => story.priority)
      .filter((priority) => priority !== null);

    // Available priorities are 1-5 that are not in use
    const availablePriorities = [];
    for (let i = 1; i <= 5; i++) {
      if (!usedPriorityNumbers.includes(i)) {
        availablePriorities.push(i);
      }
    }

    res.json({
      success: true,
      data: {
        available: availablePriorities,
        used: usedPriorityNumbers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching available priorities",
      error: error.message,
    });
  }
};

// Get pending success stories (governor only)
const getPendingSuccessStories = async (req, res) => {
  try {
    const successStories = await SuccessStory.find({
      approvalStatus: "pending",
    })
      .populate("submittedBy", "fullName email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: successStories.length,
      data: successStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pending success stories",
      error: error.message,
    });
  }
};

// Approve success story (governor only)
const approveSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;

    const successStory = await SuccessStory.findById(id);

    if (!successStory) {
      return res.status(404).json({
        success: false,
        message: "Success story not found",
      });
    }

    if (successStory.approvalStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Success story is not pending approval",
      });
    }

    successStory.approvalStatus = "approved";
    await successStory.save();

    res.json({
      success: true,
      message: "Success story approved successfully",
      data: successStory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error approving success story",
      error: error.message,
    });
  }
};

// Decline success story (governor only)
const declineSuccessStory = async (req, res) => {
  try {
    const { id } = req.params;

    const successStory = await SuccessStory.findById(id);

    if (!successStory) {
      return res.status(404).json({
        success: false,
        message: "Success story not found",
      });
    }

    if (successStory.approvalStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Success story is not pending approval",
      });
    }

    successStory.approvalStatus = "declined";
    await successStory.save();

    res.json({
      success: true,
      message: "Success story declined successfully",
      data: successStory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error declining success story",
      error: error.message,
    });
  }
};

// Get volunteer's submitted success stories
const getMySuccessStories = async (req, res) => {
  try {
    const volunteerId = req.user.volunteerId;

    const successStories = await SuccessStory.find({
      submittedBy: volunteerId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: successStories.length,
      data: successStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your success stories",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSuccessStories,
  getSuccessStoryById,
  createSuccessStory,
  submitSuccessStoryByVolunteer,
  updateSuccessStory,
  deleteSuccessStory,
  getPrioritizedSuccessStories,
  getAvailablePriorities,
  getPendingSuccessStories,
  approveSuccessStory,
  declineSuccessStory,
  getMySuccessStories,
};
