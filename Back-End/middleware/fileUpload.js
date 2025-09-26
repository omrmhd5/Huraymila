const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create submissions folder if it doesn't exist
    const submissionsDir = path.join(__dirname, "../public/submissions");
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
    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
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
  const submissionDir = path.join(
    __dirname,
    "../public/submissions",
    submissionId
  );

  // Create submission-specific directory
  if (!fs.existsSync(submissionDir)) {
    fs.mkdirSync(submissionDir, { recursive: true });
  }

  const movedFiles = [];

  tempFiles.forEach((file) => {
    const oldPath = file.path;
    const newPath = path.join(submissionDir, file.filename);

    try {
      // Move file from temp to submission folder
      fs.renameSync(oldPath, newPath);

      // Update file path for database storage
      movedFiles.push({
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        path: `/submissions/${submissionId}/${file.filename}`,
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

module.exports = {
  upload,
  moveFilesToSubmissionFolder,
  cleanupTempFiles,
};
