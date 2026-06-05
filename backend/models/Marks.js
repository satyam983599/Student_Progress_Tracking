const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subject: String,
  marksObtained: Number,
  totalMarks: Number,
  resultDate: String,
});

const examSchema = new mongoose.Schema({
  subjects: [subjectSchema],
});

const marksSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    studentName: String,
    rollNumber: Number,
    class: Number,
    section: String,
    academicYear: String,

    teacherName: String,
    remarks: String,

    // ⭐ MAIN CHANGE (ERP STRUCTURE)
    exams: {
      unitTest1: examSchema,
      unitTest2: examSchema,
      project1: examSchema,
      halfYearly: examSchema,
      unitTest3: examSchema,
      unitTest4: examSchema,
      project2: examSchema,
      finalExam: examSchema,
    },
  },
  { timestamps: true }
);

// 🔥 one record per student per year
marksSchema.index({ studentId: 1, academicYear: 1 }, { unique: true });

module.exports = mongoose.model("Marks", marksSchema);