const express = require("express");
const router = express.Router();
const {
  getAllSuccessStories,
  getSuccessStoryById,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
  getPrioritizedSuccessStories,
  getAvailablePriorities,
} = require("../Controllers/successStoryController");
const {
  upload: successStoryFileUpload,
} = require("../middleware/successStoryFileUpload");
const { governorOnly } = require("../middleware/authProtection");

// Public routes
router.get("/", getAllSuccessStories);
router.get("/prioritized", getPrioritizedSuccessStories);
router.get("/:id", getSuccessStoryById);

// Protected routes (governor only)
router.post(
  "/",
  governorOnly,
  successStoryFileUpload.single("image"),
  createSuccessStory
);
router.put(
  "/:id",
  governorOnly,
  successStoryFileUpload.single("image"),
  updateSuccessStory
);
router.delete("/:id", governorOnly, deleteSuccessStory);
router.get("/available-priorities", governorOnly, getAvailablePriorities);

module.exports = router;
