const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure storage for news images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create public/news folder if it doesn't exist
    const publicDir = path.join(__dirname, "../public");
    const newsDir = path.join(publicDir, "news");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    if (!fs.existsSync(newsDir)) {
      fs.mkdirSync(newsDir, { recursive: true });
    }

    // For now, store in temp folder - will move to news-specific folder after creation
    const tempDir = path.join(newsDir, "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // Use timestamp and original filename for uniqueness
    const timestamp = Date.now();
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, extension);
    const filename = `${timestamp}-${nameWithoutExt}${extension}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Helper function to move image to news-specific folder
const moveImageToNewsFolder = (newsId, tempFile) => {
  const newsDir = path.join(__dirname, "../public/news", newsId);

  // Create news-specific directory
  if (!fs.existsSync(newsDir)) {
    fs.mkdirSync(newsDir, { recursive: true });
  }

  const oldPath = tempFile.path;
  const extension = path.extname(tempFile.originalname);
  const originalName = path.basename(tempFile.originalname, extension);
  const newFilename = `${originalName}${extension}`;
  const newPath = path.join(newsDir, newFilename);

  try {
    // Remove existing image if it exists
    if (fs.existsSync(newPath)) {
      fs.unlinkSync(newPath);
    }

    // Move file from temp to news folder
    fs.renameSync(oldPath, newPath);

    return `/public/news/${newsId}/${newFilename}`;
  } catch (error) {
    console.error("Error moving news image:", error);
    throw error;
  }
};

// Helper function to delete physical image file
const deleteNewsImage = (imageUrl) => {
  try {
    if (!imageUrl) return;

    // Convert URL path to actual file system path
    // imageUrl format: "/public/news/{newsId}/{filename}"
    const relativePath = imageUrl.startsWith("/")
      ? imageUrl.substring(1)
      : imageUrl;
    const fullPath = path.join(__dirname, "..", relativePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted news image: ${fullPath}`);
    }
  } catch (error) {
    console.error(`Error deleting news image ${imageUrl}:`, error);
  }
};

// Helper function to delete entire news folder
const deleteNewsFolder = (newsId) => {
  try {
    const newsDir = path.join(__dirname, "../public/news", newsId);

    if (fs.existsSync(newsDir)) {
      // Remove all files in the directory
      const files = fs.readdirSync(newsDir);
      files.forEach((file) => {
        const filePath = path.join(newsDir, file);
        fs.unlinkSync(filePath);
      });

      // Remove the directory itself
      fs.rmdirSync(newsDir);
      console.log(`Deleted news folder: ${newsDir}`);
    }
  } catch (error) {
    console.error(`Error deleting news folder for ${newsId}:`, error);
  }
};

// Helper function to clean up temp files
const cleanupTempFiles = (files) => {
  if (!Array.isArray(files)) {
    files = [files];
  }

  files.forEach((file) => {
    try {
      if (file && file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (error) {
      console.error("Error cleaning up temp file:", error);
    }
  });
};

module.exports = {
  upload,
  moveImageToNewsFolder,
  deleteNewsImage,
  deleteNewsFolder,
  cleanupTempFiles,
};
