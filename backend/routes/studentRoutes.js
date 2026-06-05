const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Marks = require("../models/Marks");

// ================================
// GET ALL STUDENTS
// ================================
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================================
// ADD STUDENT
// ================================
router.post("/add", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================================
// SEARCH STUDENT (OPTIONAL)
// ================================
router.get("/search", async (req, res) => {
  try {
    const { name, rollNumber, className } = req.query;

    let filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (rollNumber) filter.rollNumber = Number(rollNumber);
    if (className) filter.class = className;

    const students = await Student.find(filter);

    res.json({
      success: true,
      data: students,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================================
// ⭐ PRIMARY KEY ROUTE (IMPORTANT)
// ================================
router.get("/roll/:rollNumber", async (req, res) => {
  try {
    const rollNumber = Number(req.params.rollNumber);

    const student = await Student.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const marks = await Marks.find({ studentId: student._id });

    res.json({
      success: true,
      student,
      marks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;