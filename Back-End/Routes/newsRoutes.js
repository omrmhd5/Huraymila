const express = require("express");
const router = express.Router();
const {
  getAllNews,
  getPrioritizedNews,
  getAvailablePriorities,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require("../Controllers/newsController");
const { upload } = require("../middleware/newsFileUpload");
const { governorOnly } = require("../middleware/authProtection");

// Public routes
router.get("/", getAllNews);
router.get("/prioritized", getPrioritizedNews);
router.get("/:id", getNewsById);

// Protected routes (governor only)
router.use(governorOnly);

// Governor routes
router.get("/available-priorities", getAvailablePriorities);
router.post("/", upload.single("image"), createNews);
router.put("/:id", upload.single("image"), updateNews);
router.delete("/:id", deleteNews);

module.exports = router;
