const fs = require("fs");
const path = require("path");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");

const PUBLIC_PATH_PREFIX = "/public/submissions/";

function isSubmissionS3Enabled() {
  return Boolean(process.env.SUBMISSIONS_S3_BUCKET?.trim());
}

function getBucket() {
  return process.env.SUBMISSIONS_S3_BUCKET.trim();
}

function getClient() {
  const region =
    process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "eu-central-1";
  return new S3Client({ region });
}

/** DB / API path: /public/submissions/{id}/{filename} */
function toPublicFilePath(submissionId, filename) {
  return `${PUBLIC_PATH_PREFIX}${submissionId}/${filename}`;
}

/** S3 object key: submissions/{id}/{filename} */
function fileUrlToS3Key(fileUrl) {
  const normalized = fileUrl.startsWith("/") ? fileUrl.slice(1) : fileUrl;
  if (normalized.startsWith("public/submissions/")) {
    return normalized.replace(/^public\//, "");
  }
  if (normalized.startsWith("submissions/")) {
    return normalized;
  }
  return null;
}

function submissionIdFromPublicPath(fileUrl) {
  const key = fileUrlToS3Key(fileUrl);
  if (!key) return null;
  const parts = key.split("/");
  return parts.length >= 2 ? parts[1] : null;
}

function filenameFromPublicPath(fileUrl) {
  const key = fileUrlToS3Key(fileUrl);
  if (!key) return null;
  return path.basename(key);
}

function submissionMatchesFileUrl(submissionId, fileUrl) {
  return submissionIdFromPublicPath(fileUrl) === submissionId;
}

async function objectExists(key) {
  try {
    await getClient().send(
      new HeadObjectCommand({ Bucket: getBucket(), Key: key }),
    );
    return true;
  } catch (err) {
    if (err.name === "NotFound" || err.$metadata?.httpStatusCode === 404) {
      return false;
    }
    throw err;
  }
}

async function resolveUniqueFilename(submissionId, originalFilename) {
  let finalFilename = originalFilename;
  let counter = 1;
  const extension = path.extname(originalFilename);
  const nameWithoutExt = path.basename(originalFilename, extension);

  while (await objectExists(`submissions/${submissionId}/${finalFilename}`)) {
    finalFilename = `${nameWithoutExt}(${counter})${extension}`;
    counter += 1;
  }
  return finalFilename;
}

async function uploadFromMulterFile(submissionId, file) {
  const originalFilename = Buffer.from(file.originalname, "latin1").toString(
    "utf8",
  );
  const finalFilename = await resolveUniqueFilename(
    submissionId,
    originalFilename,
  );
  const key = `submissions/${submissionId}/${finalFilename}`;
  const body = fs.readFileSync(file.path);

  await getClient().send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: key,
      Body: body,
      ContentType: file.mimetype || "application/octet-stream",
    }),
  );

  try {
    fs.unlinkSync(file.path);
  } catch {
    // temp cleanup best-effort
  }

  return {
    filename: finalFilename,
    originalname: originalFilename,
    size: file.size,
    mimetype: file.mimetype,
    path: toPublicFilePath(submissionId, finalFilename),
  };
}

async function getReadStream(submissionId, filename) {
  const key = `submissions/${submissionId}/${filename}`;
  const response = await getClient().send(
    new GetObjectCommand({ Bucket: getBucket(), Key: key }),
  );
  return response;
}

async function deleteObjectsForUrls(fileUrls) {
  const keys = fileUrls.map(fileUrlToS3Key).filter(Boolean);
  if (keys.length === 0) return;

  await getClient().send(
    new DeleteObjectsCommand({
      Bucket: getBucket(),
      Delete: {
        Objects: keys.map((Key) => ({ Key })),
        Quiet: true,
      },
    }),
  );
}

async function deleteSubmissionPrefix(submissionId) {
  const prefix = `submissions/${submissionId}/`;
  let continuationToken;

  do {
    const list = await getClient().send(
      new ListObjectsV2Command({
        Bucket: getBucket(),
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );

    const keys = (list.Contents || []).map((o) => ({ Key: o.Key }));
    if (keys.length > 0) {
      await getClient().send(
        new DeleteObjectsCommand({
          Bucket: getBucket(),
          Delete: { Objects: keys, Quiet: true },
        }),
      );
    }
    continuationToken = list.IsTruncated
      ? list.NextContinuationToken
      : undefined;
  } while (continuationToken);
}

module.exports = {
  isSubmissionS3Enabled,
  toPublicFilePath,
  fileUrlToS3Key,
  submissionIdFromPublicPath,
  filenameFromPublicPath,
  submissionMatchesFileUrl,
  uploadFromMulterFile,
  getReadStream,
  deleteObjectsForUrls,
  deleteSubmissionPrefix,
};
