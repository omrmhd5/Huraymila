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
    const {
      title,
      subtitle,
      description,
      author,
      date,
      quote,
      before,
      after,
      priority,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !subtitle ||
      !description ||
      !author ||
      !quote ||
      !before ||
      !after
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create success story data
    const successStoryData = {
      title,
      subtitle,
      description,
      author,
      date: date || new Date(),
      quote,
      before,
      after,
      approvalStatus: "approved", // Governor submissions are auto-approved
    };

    // Handle priority if provided
    if (priority && priority >= 1 && priority <= 5) {
      // Check if priority is already assigned to another success story
      const existingSuccessStory = await SuccessStory.findOne({ priority });
      if (existingSuccessStory) {
        return res.status(400).json({
          success: false,
          message: `Priority ${priority} is already assigned to another success story`,
        });
      }
      successStoryData.priority = priority;
    }

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
        console.error("Error handling image upload:", imageError);
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
      message: "Success story created successfully",
      data: successStory,
    });
  } catch (error) {
    console.error("Error creating success story:", error);
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
    const { title, subtitle, description, author, date, quote, before, after } =
      req.body;

    // Validate required fields
    if (
      !title ||
      !subtitle ||
      !description ||
      !author ||
      !quote ||
      !before ||
      !after
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create success story data
    const successStoryData = {
      title,
      subtitle,
      description,
      author,
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
        console.error("Error handling image upload:", imageError);
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
    console.error("Error submitting success story:", error);
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
    const {
      title,
      subtitle,
      description,
      author,
      date,
      quote,
      before,
      after,
      priority,
    } = req.body;

    const successStory = await SuccessStory.findById(id);
    if (!successStory) {
      return res.status(404).json({
        success: false,
        message: "Success story not found",
      });
    }

    // Prepare update data - only include fields that are actually provided
    const updateData = {};

    if (title !== undefined && title !== null && title !== "") {
      updateData.title = title;
    }
    if (subtitle !== undefined && subtitle !== null && subtitle !== "") {
      updateData.subtitle = subtitle;
    }
    if (
      description !== undefined &&
      description !== null &&
      description !== ""
    ) {
      updateData.description = description;
    }
    if (author !== undefined && author !== null && author !== "") {
      updateData.author = author;
    }
    if (
      date !== undefined &&
      date !== null &&
      date !== "" &&
      date !== "undefined"
    ) {
      updateData.date = date;
    }
    if (quote !== undefined && quote !== null && quote !== "") {
      updateData.quote = quote;
    }
    if (before !== undefined && before !== null && before !== "") {
      updateData.before = before;
    }
    if (after !== undefined && after !== null && after !== "") {
      updateData.after = after;
    }

    // Handle priority update
    if (priority !== undefined) {
      if (priority === null || priority === "") {
        // Remove priority
        updateData.priority = null;
      } else if (priority >= 1 && priority <= 5) {
        // Check if priority is already assigned to another success story
        const existingSuccessStory = await SuccessStory.findOne({
          priority,
          _id: { $ne: id },
        });
        if (existingSuccessStory) {
          return res.status(400).json({
            success: false,
            message: `Priority ${priority} is already assigned to another success story`,
          });
        }
        updateData.priority = priority;
      }
    }

    // Handle image update if new image is provided
    if (req.file) {
      try {
        // Delete old image if exists
        if (successStory.imageUrl) {
          deleteSuccessStoryImage(successStory.imageUrl);
        }

        // Move new image to permanent location
        const imageUrl = moveImageToSuccessStoryFolder(id, req.file);
        updateData.imageUrl = imageUrl;
      } catch (imageError) {
        console.error("Error handling image update:", imageError);
        cleanupTempFiles([req.file]);
        return res.status(500).json({
          success: false,
          message: "Error updating image",
          error: imageError.message,
        });
      }
    }

    // Update success story
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
    console.error("Error updating success story:", error);
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
    console.error("Error deleting success story:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting success story",
      error: error.message,
    });
  }
};

// Get prioritized success stories for home page
const getPrioritizedSuccessStories = async (req, res) => {
  try {
    const { limit = 3 } = req.query;

    // Get success stories sorted by priority (ascending) then by date (descending)
    // Priority 1 is highest, 5 is lowest, null priority comes last
    const successStories = await SuccessStory.aggregate([
      {
        $addFields: {
          sortPriority: {
            $cond: {
              if: { $eq: ["$priority", null] },
              then: 999, // Put null priorities at the end
              else: "$priority",
            },
          },
        },
      },
      {
        $sort: { sortPriority: 1, date: -1 },
      },
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          sortPriority: 0, // Remove the temporary field
        },
      },
    ]);

    res.json({
      success: true,
      count: successStories.length,
      data: successStories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching prioritized success stories",
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
