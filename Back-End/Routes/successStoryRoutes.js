const express = require("express");
const router = express.Router();
const {
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
} = require("../Controllers/successStoryController");
const {
  upload: successStoryFileUpload,
} = require("../middleware/successStoryFileUpload");
const {
  governorOnly,
  volunteerOnly,
  authenticatedOnly,
} = require("../middleware/authProtection");

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
router.get("/pending/all", governorOnly, getPendingSuccessStories);
router.patch("/:id/approve", governorOnly, approveSuccessStory);
router.patch("/:id/decline", governorOnly, declineSuccessStory);

// Volunteer routes
router.post(
  "/submit",
  volunteerOnly,
  successStoryFileUpload.single("image"),
  submitSuccessStoryByVolunteer
);
router.get("/my/stories", volunteerOnly, getMySuccessStories);

module.exports = router;
