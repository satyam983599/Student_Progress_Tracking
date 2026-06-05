const express = require("express");
const router = express.Router();

const Marks = require("../models/Marks");

// ===============================
// SAVE / UPDATE EXAM MARKS (UPSERT)
// ===============================
router.post("/upload", async (req, res) => {
  try {
    const {
      studentId,
      academicYear,
      examName,
      subjects,
      teacherName,
      remarks,
      rollNumber,
      studentName,
      class: className,
      section,
    } = req.body;

    // exam mapping
    const examKeyMap = {
      "Unit Test 1": "unitTest1",
      "Unit Test 2": "unitTest2",
      "Project 1": "project1",
      "Half Yearly": "halfYearly",
      "Unit Test 3": "unitTest3",
      "Unit Test 4": "unitTest4",
      "Project 2": "project2",
      "Final Exam": "finalExam",
    };

    const examKey = examKeyMap[examName];

    if (!examKey) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam name",
      });
    }

    const filter = { studentId, academicYear };

    const update = {
      $set: {
        studentId,
        studentName,
        rollNumber,
        class: className,
        section,
        academicYear,
        teacherName,
        remarks,
        [`exams.${examKey}.subjects`]: subjects,
      },
    };

    const options = {
      new: true,
      upsert: true,
    };

    const result = await Marks.findOneAndUpdate(
      filter,
      update,
      options
    );

    res.status(200).json({
      success: true,
      message: "Marks saved successfully",
      data: result,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;