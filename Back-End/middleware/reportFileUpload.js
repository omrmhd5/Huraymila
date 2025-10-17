const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure directories exist
const tempDir = path.join(__dirname, "../public/reports/temp");
const uploadDir = path.join(__dirname, "../public/reports");

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

// File filter - allow images and videos
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"), false);
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for videos
  },
});

// Middleware function - multiple files
const reportFileUpload = upload.array("files", 10); // Max 10 files

// Helper function to move files from temp to permanent location
const moveFilesToReportFolder = (reportId, tempFiles) => {
  if (!tempFiles || tempFiles.length === 0) return [];

  const reportDir = path.join(uploadDir, reportId);

  // Create report specific directory
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const movedFiles = [];

  tempFiles.forEach((file) => {
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    const newFilename = `${originalName}${extension}`;

    const tempPath = file.path;
    const finalPath = path.join(reportDir, newFilename);

    // If file with same name exists, add timestamp
    let uniqueFinalPath = finalPath;
    if (fs.existsSync(finalPath)) {
      const timestamp = Date.now();
      const uniqueFilename = `${originalName}-${timestamp}${extension}`;
      uniqueFinalPath = path.join(reportDir, uniqueFilename);
    }

    // Move file from temp to final location
    fs.renameSync(tempPath, uniqueFinalPath);

    // Return the relative path for database storage
    const filename = path.basename(uniqueFinalPath);
    movedFiles.push({
      path: `/public/reports/${reportId}/${filename}`,
      originalName: file.originalname,
      mimetype: file.mimetype,
    });
  });

  return movedFiles;
};

// Helper function to delete report files
const deleteReportFiles = (filesUrls) => {
  if (!filesUrls || filesUrls.length === 0) return;

  filesUrls.forEach((fileUrl) => {
    try {
      const filePath = path.join(__dirname, "..", fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      // Error deleting report file
    }
  });
};

// Helper function to delete entire report folder
const deleteReportFolder = (reportId) => {
  try {
    const reportDir = path.join(uploadDir, reportId);
    if (fs.existsSync(reportDir)) {
      fs.rmSync(reportDir, { recursive: true, force: true });
    }
  } catch (error) {
    // Error deleting report folder
  }
};

// Helper function to cleanup temp files
const cleanupTempFiles = (files) => {
  if (!files || files.length === 0) return;

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
  reportFileUpload,
  moveFilesToReportFolder,
  deleteReportFiles,
  deleteReportFolder,
  cleanupTempFiles,
};
