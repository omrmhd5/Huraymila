const News = require("../Models/News");
const {
  moveImageToNewsFolder,
  deleteNewsImage,
  deleteNewsFolder,
  cleanupTempFiles,
} = require("../middleware/newsFileUpload");

// Get all news (public route)
const getAllNews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "date",
      sortOrder = "desc",
    } = req.query;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const news = await News.find()
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await News.countDocuments();

    res.json({
      success: true,
      count: news.length,
      total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching news",
      error: error.message,
    });
  }
};

// Get prioritized news for home page (public route)
const getPrioritizedNews = async (req, res) => {
  try {
    const { limit = 3 } = req.query;

    // Get news sorted by priority (ascending) then by date (descending)
    // Priority 1 is highest, 5 is lowest, null priority comes last
    const news = await News.aggregate([
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
      count: news.length,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching prioritized news",
      error: error.message,
    });
  }
};

// Get available priorities (governor only)
const getAvailablePriorities = async (req, res) => {
  try {
    const { excludeId } = req.query;

    // Get all priorities currently in use
    const query = {};
    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const usedPriorities = await News.find(query, { priority: 1 });
    const usedPriorityNumbers = usedPriorities
      .map((news) => news.priority)
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

// Get news by ID (public route)
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found",
      });
    }

    res.json({
      success: true,
      data: news,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching news article",
      error: error.message,
    });
  }
};

// Create new news (governor only)
const createNews = async (req, res) => {
  try {
    const { title, subtitle, description, date, priority } = req.body;

    // Validate required fields
    if (!title || !subtitle || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, subtitle, and description are required",
      });
    }

    // Check if priority is already taken (if priority is provided)
    let finalPriority = null;
    if (priority && priority !== "") {
      const priorityNum = parseInt(priority);
      if (priorityNum >= 1 && priorityNum <= 5) {
        const existingNews = await News.findOne({ priority: priorityNum });
        if (existingNews) {
          return res.status(400).json({
            success: false,
            message: `Priority ${priorityNum} is already assigned to another news article`,
          });
        }
        finalPriority = priorityNum;
      }
    }

    const newsData = {
      title,
      subtitle,
      description,
      date: date ? new Date(date) : new Date(),
      priority: finalPriority,
    };

    const news = new News(newsData);
    await news.save();

    // Handle image upload if provided
    let imageUrl = null;
    if (req.file) {
      try {
        imageUrl = moveImageToNewsFolder(news._id.toString(), req.file);
        news.imageUrl = imageUrl;
        await news.save();
      } catch (error) {
        // Error moving image
        // Clean up the created news if image processing fails
        await News.findByIdAndDelete(news._id);
        return res.status(500).json({
          success: false,
          message: "Error processing image",
        });
      }
    }

    res.status(201).json({
      success: true,
      message: "News article created successfully",
      data: news,
    });
  } catch (error) {
    // Clean up uploaded file if news creation failed
    if (req.file) {
      try {
        cleanupTempFiles([req.file]);
      } catch (cleanupError) {
        // Error cleaning up temp file
      }
    }

    res.status(500).json({
      success: false,
      message: "Error creating news article",
      error: error.message,
    });
  }
};

// Update news (governor only)
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, description, date, priority } = req.body;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found",
      });
    }

    // Handle image upload if provided
    let imageUrl = news.imageUrl; // Keep existing image by default
    if (req.file) {
      try {
        // Delete old image if it exists
        if (news.imageUrl) {
          deleteNewsImage(news.imageUrl);
        }

        // Move new image
        imageUrl = moveImageToNewsFolder(id, req.file);
      } catch (error) {
        // Error processing image
        return res.status(500).json({
          success: false,
          message: "Error processing image",
        });
      }
    }

    // Handle priority assignment/removal
    let finalPriority = news.priority;
    if (priority !== undefined) {
      if (priority === "" || priority === null) {
        // Remove priority
        finalPriority = null;
      } else {
        const priorityNum = parseInt(priority);
        if (priorityNum >= 1 && priorityNum <= 5) {
          // Check if this priority is already taken by another news article
          const existingNews = await News.findOne({
            priority: priorityNum,
            _id: { $ne: id },
          });
          if (existingNews) {
            return res.status(400).json({
              success: false,
              message: `Priority ${priorityNum} is already assigned to another news article`,
            });
          }
          finalPriority = priorityNum;
        }
      }
    }

    // Update news data
    const updateData = {
      title: title || news.title,
      subtitle: subtitle || news.subtitle,
      description: description || news.description,
      date: date ? new Date(date) : news.date,
      priority: finalPriority,
      imageUrl,
    };

    const updatedNews = await News.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "News article updated successfully",
      data: updatedNews,
    });
  } catch (error) {
    // Clean up uploaded file if update failed
    if (req.file) {
      try {
        cleanupTempFiles([req.file]);
      } catch (cleanupError) {
        // Error cleaning up temp file
      }
    }

    res.status(500).json({
      success: false,
      message: "Error updating news article",
      error: error.message,
    });
  }
};

// Delete news (governor only)
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News article not found",
      });
    }

    // Delete associated image if it exists
    if (news.imageUrl) {
      try {
        deleteNewsImage(news.imageUrl);
      } catch (error) {
        // Error deleting news image
        // Continue with news deletion even if image deletion fails
      }
    }

    // Delete the entire news folder
    deleteNewsFolder(id);

    await News.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "News article deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting news article",
      error: error.message,
    });
  }
};

module.exports = {
  getAllNews,
  getPrioritizedNews,
  getAvailablePriorities,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
