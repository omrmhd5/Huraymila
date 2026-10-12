const multer = require("multer");
const path = require("path");
const fs = require("fs");
const s3SubmissionStorage = require("../utils/s3SubmissionStorage");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create public/submissions folder if it doesn't exist
    const publicDir = path.join(__dirname, "../public");
    const submissionsDir = path.join(publicDir, "submissions");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    if (!fs.existsSync(submissionsDir)) {
      fs.mkdirSync(submissionsDir, { recursive: true });
    }

    // Temp folder — multer writes here, then we move to disk or S3
    const tempDir = path.join(submissionsDir, "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = Buffer.from(file.originalname, "latin1").toString(
      "utf8",
    );
    const extension = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, extension);
    const filename = `${timestamp}-${nameWithoutExt}${extension}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 10,
  },
});

const moveFilesToLocalSubmissionFolder = (submissionId, tempFiles) => {
  const submissionDir = path.join(
    __dirname,
    "../public/submissions",
    submissionId,
  );

  if (!fs.existsSync(submissionDir)) {
    fs.mkdirSync(submissionDir, { recursive: true });
  }

  const movedFiles = [];

  tempFiles.forEach((file) => {
    const oldPath = file.path;
    const originalFilename = Buffer.from(file.originalname, "latin1").toString(
      "utf8",
    );
    let finalFilename = originalFilename;
    let counter = 1;

    while (fs.existsSync(path.join(submissionDir, finalFilename))) {
      const extension = path.extname(originalFilename);
      const nameWithoutExt = path.basename(originalFilename, extension);
      finalFilename = `${nameWithoutExt}(${counter})${extension}`;
      counter++;
    }

    const newPath = path.join(submissionDir, finalFilename);

    try {
      fs.renameSync(oldPath, newPath);
      movedFiles.push({
        filename: finalFilename,
        originalname: originalFilename,
        size: file.size,
        mimetype: file.mimetype,
        path: `/public/submissions/${submissionId}/${finalFilename}`,
      });
    } catch (error) {
      // skip failed move
    }
  });

  return movedFiles;
};

const moveFilesToSubmissionFolder = async (submissionId, tempFiles) => {
  if (s3SubmissionStorage.isSubmissionS3Enabled()) {
    const movedFiles = [];
    for (const file of tempFiles) {
      movedFiles.push(
        await s3SubmissionStorage.uploadFromMulterFile(submissionId, file),
      );
    }
    return movedFiles;
  }
  return moveFilesToLocalSubmissionFolder(submissionId, tempFiles);
};

const cleanupTempFiles = (files) => {
  files.forEach((file) => {
    try {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (error) {
      // best-effort
    }
  });
};

const deletePhysicalFiles = async (fileUrls) => {
  if (s3SubmissionStorage.isSubmissionS3Enabled()) {
    await s3SubmissionStorage.deleteObjectsForUrls(fileUrls);
    return;
  }

  fileUrls.forEach((fileUrl) => {
    try {
      const relativePath = fileUrl.startsWith("/")
        ? fileUrl.substring(1)
        : fileUrl;
      const fullPath = path.join(__dirname, "..", relativePath);

      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } catch (error) {
      // best-effort
    }
  });
};

const deleteSubmissionFolder = async (submissionId) => {
  if (s3SubmissionStorage.isSubmissionS3Enabled()) {
    await s3SubmissionStorage.deleteSubmissionPrefix(submissionId);
    return;
  }

  try {
    const submissionDir = path.join(
      __dirname,
      "../public/submissions",
      submissionId,
    );

    if (fs.existsSync(submissionDir)) {
      const files = fs.readdirSync(submissionDir);
      files.forEach((file) => {
        const filePath = path.join(submissionDir, file);
        fs.unlinkSync(filePath);
      });
      fs.rmdirSync(submissionDir);
    }
  } catch (error) {
    // best-effort
  }
};

module.exports = {
  upload,
  moveFilesToSubmissionFolder,
  cleanupTempFiles,
  deletePhysicalFiles,
  deleteSubmissionFolder,
};
