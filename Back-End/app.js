const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./Routes/userRoutes");
const standardRoutes = require("./Routes/standardRoutes");
const agencyRoutes = require("./Routes/agencyRoutes");
const submissionRoutes = require("./Routes/submissionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create API router
const apiRouter = express.Router();
app.use("/api", apiRouter);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Huraymila Backend API is running!" });
});

// Routes
apiRouter.use("/users", userRoutes);
apiRouter.use("/standards", standardRoutes);
apiRouter.use("/agencies", agencyRoutes);
apiRouter.use("/submissions", submissionRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/huraymila")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} `);
    });
    console.log("MongoDB connected successfully");
  })
  .catch((err) => console.log("MongoDB connection error:", err));
