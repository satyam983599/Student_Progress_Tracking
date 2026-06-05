const Marks = require("../models/Marks");

exports.getInstantReport = async (req, res) => {
  try {
    const studentId = req.params.id;

    const marksData = await Marks.find({ studentId }).populate("studentId");

    let totalObtained = 0;
    let totalMarks = 0;

    let subjectAnalysis = [];

    marksData.forEach((record) => {
      let obtained = 0;

      const exams = [
        record.internalTest1,
        record.internalTest2,
        record.project1,
        record.halfYearly,
        record.internalTest3,
        record.internalTest4,
        record.project2,
        record.finalExam,
      ];

      exams.forEach((mark) => {
        if (mark !== null && mark !== undefined) {
          obtained += mark;
        }
      });

      const maxMarks = exams.filter((m) => m != null).length * 100;

      totalObtained += obtained;
      totalMarks += maxMarks;

      subjectAnalysis.push({
        subject: record.subjectName || "Subject",
        obtained,
        total: maxMarks,
        percentage:
          maxMarks > 0 ? ((obtained / maxMarks) * 100).toFixed(2) : 0,
      });
    });

    const overallPercentage =
      totalMarks > 0 ? ((totalObtained / totalMarks) * 100).toFixed(2) : 0;

    res.json({
      overallPercentage,
      totalObtained,
      totalMarks,
      subjectAnalysis,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};