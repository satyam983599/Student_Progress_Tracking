const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");
const marksRoutes = require("./routes/marksRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const analyticsRoutes =require("./routes/analyticsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// DB CONNECT
connectDB();

// ROUTES
app.use("/api/students", studentRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/subjects", subjectRoutes);
app.use( "/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("School ERP Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});