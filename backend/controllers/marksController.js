const Marks = require("../models/Marks");

exports.saveMarks = async (req, res) => {
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

    let report = await Marks.findOne({
      studentId,
      academicYear,
    });

    if (!report) {
      report = await Marks.create({
        studentId,
        studentName,
        rollNumber,
        class: className,
        section,
        academicYear,
        teacherName,
        remarks,
      });
    }

    const existingSubjects =
      report.exams?.[examKey]?.subjects || [];

    for (const subject of subjects) {
      const duplicate = existingSubjects.find(
        (s) =>
          s.subject.toLowerCase() ===
          subject.subject.toLowerCase()
      );

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: `${subject.subject} already exists in ${examName}`,
        });
      }
    }

    report.teacherName = teacherName;
    report.remarks = remarks;

    report.exams[examKey].subjects.push(
      ...subjects
    );

    await report.save();

    res.status(200).json({
      success: true,
      message: "Marks saved successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};