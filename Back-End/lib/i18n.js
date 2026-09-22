const en = require("../locales/en.json");
const ar = require("../locales/ar.json");

const catalogs = { en, ar };

function getLang(req) {
  const header = req?.headers?.["x-language"] || req?.headers?.["accept-language"] || "";
  const value = String(header).split(",")[0].trim().toLowerCase();
  return value.startsWith("en") ? "en" : "ar";
}

function t(req, path) {
  const lang = getLang(req);
  const parts = path.split(".");
  let node = catalogs[lang];
  for (const part of parts) {
    if (!node || typeof node !== "object" || !(part in node)) {
      return path;
    }
    node = node[part];
  }
  return typeof node === "string" ? node : path;
}

module.exports = { getLang, t };
