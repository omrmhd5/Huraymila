const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const standardRoutes = require("./Routes/standardRoutes");
const agencyRoutes = require("./Routes/agencyRoutes");
const submissionRoutes = require("./Routes/submissionRoutes");
const authRoutes = require("./Routes/authRoutes");
const initiativeRoutes = require("./Routes/initiativeRoutes");
const newsRoutes = require("./Routes/newsRoutes");
const successStoryRoutes = require("./Routes/successStoryRoutes");
const healthIndicatorRoutes = require("./Routes/healthIndicatorRoutes");
const reportRoutes = require("./Routes/reportRoutes");
const mapLocationRoutes = require("./Routes/mapLocationRoutes");
const smsRoutes = require("./Routes/smsRoutes");
const partnerRoutes = require("./Routes/partnerRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  process.env.FRONTEND_URL ||
  "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept-Language",
      "X-Language",
    ],
  }),
);
app.use(express.json());

// Serve all backend public files (submissions, initiatives, etc.)
app.use("/public", express.static(path.join(__dirname, "public")));

// Create API router
const apiRouter = express.Router();
app.use("/api", apiRouter);

// API Basic route
apiRouter.get("/", (req, res) => {
  res.json({ message: "Huraymila Backend API is running!" });
});

// API Routes
apiRouter.use("/auth", authRoutes);
apiRouter.use("/standards", standardRoutes);
apiRouter.use("/agencies", agencyRoutes);
apiRouter.use("/submissions", submissionRoutes);
apiRouter.use("/initiatives", initiativeRoutes);
apiRouter.use("/news", newsRoutes);
apiRouter.use("/success-stories", successStoryRoutes);
apiRouter.use("/health-indicators", healthIndicatorRoutes);
apiRouter.use("/reports", reportRoutes);
apiRouter.use("/map-locations", mapLocationRoutes);
apiRouter.use("/sms", smsRoutes);
apiRouter.use("/partners", partnerRoutes);

if (process.env.SERVE_FRONTEND === "true") {
  app.use(express.static(path.join(__dirname, "../Front-End/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-End/dist", "index.html"));
  });
}

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/huraymila-demo",
  )
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
