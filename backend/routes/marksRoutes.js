const express = require("express");
const router = express.Router();

const Marks = require("../models/Marks");

/*
=========================================
SAVE / UPDATE EXAM MARKS
=========================================
*/
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
        message: "Invalid Exam Name",
      });
    }

    const report = await Marks.findOneAndUpdate(
      {
        studentId,
        academicYear,
      },
      {
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
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/*
=========================================
GET STUDENT REPORT
=========================================
*/
router.get("/report/:studentId", async (req, res) => {
  try {
    const report = await Marks.findOne({
      studentId: req.params.studentId,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;