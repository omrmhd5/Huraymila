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

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve all backend public files (submissions, initiatives, etc.)
app.use("/public", express.static("public"));

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

// --- FRONTEND STATIC FILES ---
// Serve the static files from the Front-End/dist directory.
app.use(express.static(path.join(__dirname, "../Front-End/dist")));

// Catch-all route to handle React/Vite client-side routing.
// This ensures refreshing the page doesn't return a 404.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front-End/dist", "index.html"));
});
// -----------------------------

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/huraymila")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
