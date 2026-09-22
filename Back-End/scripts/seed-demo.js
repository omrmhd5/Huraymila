require("dotenv").config();
const path = require("path");
const { execFileSync } = require("child_process");
const mongoose = require("mongoose");
const Agency = require("../Models/Agency");
const Governor = require("../Models/Governor");

const ARCHIVE = path.join(__dirname, "fixtures", "huraymila-demo.archive.gz");
const LOCAL_URI = "mongodb://127.0.0.1:27017/huraymila-demo";
const AGENCY_NAME = "منسق مدينة حريملاء الصحية";
const GOVERNOR_NAME = "منسق مدينة حريملاء الصحية";

function pickUri() {
  if (process.argv.includes("--remote")) {
    const uri = process.env.MONGO_URI_REMOTE;
    if (!uri || uri.includes("127.0.0.1") || uri.includes("localhost")) {
      throw new Error("Remote seed needs MONGO_URI_REMOTE for huraymila-demo.");
    }
    return uri;
  }
  return process.env.MONGO_URI_LOCAL || LOCAL_URI;
}

async function resetLogins() {
  const agency = await Agency.findOne({ name: AGENCY_NAME });
  if (!agency) throw new Error("Agency not found");
  agency.email = "agency@agency.com";
  agency.password = "agency123";
  await agency.save();

  const governor = await Governor.findOne({ name: GOVERNOR_NAME });
  if (!governor) throw new Error("Governor not found");
  governor.email = "governor@governor.com";
  governor.password = "governor123";
  await governor.save();
}

async function main() {
  const uri = pickUri();
  console.log("Restoring huraymila-demo snapshot...");
  execFileSync(
    "mongorestore",
    [
      `--uri=${uri}`,
      "--gzip",
      `--archive=${ARCHIVE}`,
      "--nsFrom=huraymila-demo.*",
      "--nsTo=huraymila-demo.*",
      "--drop",
    ],
    { stdio: "inherit" },
  );

  await mongoose.connect(uri);
  await resetLogins();
  console.log("Demo logins set: governor@governor.com and agency@agency.com");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
