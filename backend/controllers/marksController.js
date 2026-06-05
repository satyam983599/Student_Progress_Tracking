const Marks = require("../models/Marks");

exports.saveMarks = async (req, res) => {
  try {
    const {
      studentId,
      academicYear,
      studentName,
      rollNumber,
      class: className,
      section,
      teacherName,
      remarks,
      subjects,
    } = req.body;

    // 🔥 FORCE SAFE UPSERT LOGIC
    const filter = {
      studentId: studentId,
      academicYear: academicYear,
    };

    const update = {
      $set: {
        studentName,
        rollNumber,
        class: className,
        section,
        teacherName,
        remarks,
        academicYear,
      },

      // 🔥 APPEND SUBJECTS IN SAME DOCUMENT
      $push: {
        subjects: { $each: subjects },
      },
    };

    const options = {
      upsert: true,   // 👈 THIS IS THE MAGIC
      new: true,
    };

    const result = await Marks.findOneAndUpdate(
      filter,
      update,
      options
    );

    return res.status(200).json({
      success: true,
      message: "Marks saved in single document",
      data: result,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};