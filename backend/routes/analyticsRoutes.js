const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Marks = require("../models/Marks");

router.get("/dashboard", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const reports = await Marks.find();

    let totalObtained = 0;
    let totalMarks = 0;

    const classPerformanceMap = {};
    const studentPerformance = [];

    reports.forEach((student) => {
      let studentObtained = 0;
      let studentTotal = 0;

      Object.values(student.exams || {}).forEach((exam) => {
        exam?.subjects?.forEach((sub) => {
          const obtained = Number(sub.marksObtained || 0);
          const total = Number(sub.totalMarks || 0);

          totalObtained += obtained;
          totalMarks += total;

          studentObtained += obtained;
          studentTotal += total;

          if (!classPerformanceMap[student.class]) {
            classPerformanceMap[student.class] = {
              obtained: 0,
              total: 0,
            };
          }

          classPerformanceMap[student.class].obtained += obtained;
          classPerformanceMap[student.class].total += total;
        });
      });

      const percentage =
        studentTotal > 0
          ? Number(
              ((studentObtained / studentTotal) * 100).toFixed(2)
            )
          : 0;

      studentPerformance.push({
        name: student.studentName,
        percentage,
      });
    });

    const averagePercentage =
      totalMarks > 0
        ? Number(((totalObtained / totalMarks) * 100).toFixed(2))
        : 0;

    const needsAttention = studentPerformance.filter(
      (s) => s.percentage < 40
    ).length;

    const topStudents = [...studentPerformance]
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    const weakStudents = [...studentPerformance]
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 5);

    const classPerformance = [];

    for (let i = 1; i <= 10; i++) {
      const data = classPerformanceMap[i];

      classPerformance.push({
        class: `Class ${i}`,
        percentage: data
          ? Number(
              (
                (data.obtained / data.total) *
                100
              ).toFixed(2)
            )
          : 0,
      });
    }

    res.json({
      success: true,
      totalStudents,
      averagePercentage,
      needsAttention,
      totalReports: reports.length,
      classPerformance,
      topStudents,
      weakStudents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;