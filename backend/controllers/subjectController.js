const Subject = require("../models/Subject");

// Get All Subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({
      subjectName: 1,
    });

    res.status(200).json({
      success: true,
      subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Subject
exports.addSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode } = req.body;

    const existing = await Subject.findOne({
      $or: [{ subjectName }, { subjectCode }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Subject already exists",
      });
    }

    const subject = await Subject.create({
      subjectName,
      subjectCode,
    });

    res.status(201).json({
      success: true,
      subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Subject
exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Subject Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};