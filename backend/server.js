require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const marksRoutes = require("./routes/marksRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

/*
====================================
MIDDLEWARES
====================================
*/
app.use(
  cors({
    origin: "http://localhost:5173", // React/Vite frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
====================================
DATABASE CONNECTION
====================================
*/
connectDB();

/*
====================================
API ROUTES
====================================
*/
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/analytics", analyticsRoutes);

/*
====================================
HOME ROUTE
====================================
*/
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "School ERP Backend Running Successfully 🚀",
  });
});

/*
====================================
404 ROUTE
====================================
*/
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

/*
====================================
SERVER START
====================================
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 School ERP Server Running On Port ${PORT}`
  );
});