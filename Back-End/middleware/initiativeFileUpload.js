const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure storage for initiative images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create public/initiatives folder if it doesn't exist
    const publicDir = path.join(__dirname, "../public");
    const initiativesDir = path.join(publicDir, "initiatives");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    if (!fs.existsSync(initiativesDir)) {
      fs.mkdirSync(initiativesDir, { recursive: true });
    }

    // For now, store in temp folder - will move to initiative-specific folder after creation
    const tempDir = path.join(initiativesDir, "temp");
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

// File filter for images only
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Configure multer for initiative images
const uploadInitiativeImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per image
    files: 1, // Maximum 1 image per initiative
  },
});

// Helper function to move image to initiative-specific folder
const moveImageToInitiativeFolder = (initiativeId, tempFile) => {
  const initiativeDir = path.join(
    __dirname,
    "../public/initiatives",
    initiativeId
  );

  // Create initiative-specific directory
  if (!fs.existsSync(initiativeDir)) {
    fs.mkdirSync(initiativeDir, { recursive: true });
  }

  const oldPath = tempFile.path;
  const extension = path.extname(tempFile.originalname);
  const originalName = path.basename(tempFile.originalname, extension);
  const newFilename = `${originalName}${extension}`;
  const newPath = path.join(initiativeDir, newFilename);

  try {
    // Remove existing photo if it exists
    if (fs.existsSync(newPath)) {
      fs.unlinkSync(newPath);
    }

    // Move file from temp to initiative folder
    fs.renameSync(oldPath, newPath);

    return `/public/initiatives/${initiativeId}/${newFilename}`;
  } catch (error) {
    // Error moving initiative image
    throw error;
  }
};

// Helper function to delete physical image file
const deleteInitiativeImage = (imageUrl) => {
  try {
    if (!imageUrl) return;

    // Convert URL path to actual file system path
    // imageUrl format: "/public/initiatives/{initiativeId}/photo.ext"
    const relativePath = imageUrl.startsWith("/")
      ? imageUrl.substring(1)
      : imageUrl;
    const fullPath = path.join(__dirname, "..", relativePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      // Deleted initiative image
    }
  } catch (error) {
    // Error deleting initiative image
  }
};

// Helper function to delete entire initiative folder
const deleteInitiativeFolder = (initiativeId) => {
  try {
    const initiativeDir = path.join(
      __dirname,
      "../public/initiatives",
      initiativeId
    );

    if (fs.existsSync(initiativeDir)) {
      // Remove all files in the directory
      const files = fs.readdirSync(initiativeDir);
      files.forEach((file) => {
        const filePath = path.join(initiativeDir, file);
        fs.unlinkSync(filePath);
      });

      // Remove the directory itself
      fs.rmdirSync(initiativeDir);
      // Deleted initiative folder
    }
  } catch (error) {
    // Error deleting initiative folder
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
      // Error cleaning up temp file
    }
  });
};

module.exports = {
  uploadInitiativeImage,
  moveImageToInitiativeFolder,
  deleteInitiativeImage,
  deleteInitiativeFolder,
  cleanupTempFiles,
};
