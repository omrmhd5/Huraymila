const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create submissions folder if it doesn't exist
    const submissionsDir = path.join(__dirname, "../submissions");
    if (!fs.existsSync(submissionsDir)) {
      fs.mkdirSync(submissionsDir, { recursive: true });
    }

    // For now, store in temp folder - will move to submission-specific folder after creation
    const tempDir = path.join(submissionsDir, "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // Use original filename for temp storage with timestamp to avoid conflicts
    const timestamp = Date.now();
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, extension);
    const filename = `${timestamp}-${nameWithoutExt}${extension}`;
    cb(null, filename);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept all file types for now
  cb(null, true);
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit per file
    files: 10, // Maximum 10 files per request
  },
});

// Helper function to move files to submission-specific folder
const moveFilesToSubmissionFolder = (submissionId, tempFiles) => {
  const submissionDir = path.join(__dirname, "../submissions", submissionId);

  // Create submission-specific directory
  if (!fs.existsSync(submissionDir)) {
    fs.mkdirSync(submissionDir, { recursive: true });
  }

  const movedFiles = [];

  tempFiles.forEach((file) => {
    const oldPath = file.path;

    // Use the exact original filename
    const originalFilename = file.originalname;
    let finalFilename = originalFilename;
    let counter = 1;

    // Check if file already exists and generate unique name if needed
    while (fs.existsSync(path.join(submissionDir, finalFilename))) {
      const extension = path.extname(originalFilename);
      const nameWithoutExt = path.basename(originalFilename, extension);
      finalFilename = `${nameWithoutExt}(${counter})${extension}`;
      counter++;
    }

    const newPath = path.join(submissionDir, finalFilename);

    try {
      // Move file from temp to submission folder with original filename
      fs.renameSync(oldPath, newPath);

      // Update file path for database storage
      movedFiles.push({
        filename: finalFilename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        path: `/submissions/${submissionId}/${finalFilename}`,
      });
    } catch (error) {
      console.error("Error moving file:", error);
    }
  });

  return movedFiles;
};

// Helper function to clean up temp files
const cleanupTempFiles = (files) => {
  files.forEach((file) => {
    try {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (error) {
      console.error("Error cleaning up temp file:", error);
    }
  });
};

// Helper function to delete physical files from submission folder
const deletePhysicalFiles = (fileUrls) => {
  fileUrls.forEach((fileUrl) => {
    try {
      // Convert URL path to actual file system path
      // fileUrl format: "/submissions/{submissionId}/{filename}"
      const relativePath = fileUrl.startsWith("/")
        ? fileUrl.substring(1)
        : fileUrl;
      const fullPath = path.join(__dirname, "..", relativePath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log(`Deleted physical file: ${fullPath}`);
      }
    } catch (error) {
      console.error(`Error deleting physical file ${fileUrl}:`, error);
    }
  });
};

// Helper function to delete entire submission folder
const deleteSubmissionFolder = (submissionId) => {
  try {
    const submissionDir = path.join(__dirname, "../submissions", submissionId);

    if (fs.existsSync(submissionDir)) {
      // Remove all files in the directory
      const files = fs.readdirSync(submissionDir);
      files.forEach((file) => {
        const filePath = path.join(submissionDir, file);
        fs.unlinkSync(filePath);
      });

      // Remove the directory itself
      fs.rmdirSync(submissionDir);
      console.log(`Deleted submission folder: ${submissionDir}`);
    }
  } catch (error) {
    console.error(
      `Error deleting submission folder for ${submissionId}:`,
      error
    );
  }
};

module.exports = {
  upload,
  moveFilesToSubmissionFolder,
  cleanupTempFiles,
  deletePhysicalFiles,
  deleteSubmissionFolder,
};
