const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure directories exist
const tempDir = path.join(__dirname, "../public/success-stories/temp");
const uploadDir = path.join(__dirname, "../public/success-stories");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for temporary storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    const newFilename = `${timestamp}-${originalName}${extension}`;
    cb(null, newFilename);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Middleware function
const successStoryFileUpload = upload.single("image");

// Helper function to move image from temp to permanent location
const moveImageToSuccessStoryFolder = (successStoryId, tempFile) => {
  if (!tempFile) return null;

  const successStoryDir = path.join(uploadDir, successStoryId);

  // Create success story specific directory
  if (!fs.existsSync(successStoryDir)) {
    fs.mkdirSync(successStoryDir, { recursive: true });
  }

  const originalName = path.parse(tempFile.originalname).name;
  const extension = path.extname(tempFile.originalname);
  const newFilename = `${originalName}${extension}`;

  const tempPath = tempFile.path;
  const finalPath = path.join(successStoryDir, newFilename);

  // Move file from temp to final location
  fs.renameSync(tempPath, finalPath);

  // Return the relative path for database storage (starting with /public/ for static serving)
  return `/public/success-stories/${successStoryId}/${newFilename}`;
};

// Helper function to delete success story image
const deleteSuccessStoryImage = (imageUrl) => {
  if (!imageUrl) return;

  try {
    const imagePath = path.join(__dirname, "../public", imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  } catch (error) {
    // Error deleting success story image
  }
};

// Helper function to delete entire success story folder
const deleteSuccessStoryFolder = (successStoryId) => {
  try {
    const successStoryDir = path.join(uploadDir, successStoryId);
    if (fs.existsSync(successStoryDir)) {
      fs.rmSync(successStoryDir, { recursive: true, force: true });
    }
  } catch (error) {
    // Error deleting success story folder
  }
};

// Helper function to cleanup temp files
const cleanupTempFiles = (files) => {
  files.forEach((file) => {
    if (file && file.path && fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path);
      } catch (error) {
        // Error cleaning up temp file
      }
    }
  });
};

module.exports = {
  upload,
  successStoryFileUpload,
  moveImageToSuccessStoryFolder,
  deleteSuccessStoryImage,
  deleteSuccessStoryFolder,
  cleanupTempFiles,
};
