const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    marksObtained: {
      type: Number,
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
    },

    resultDate: {
      type: String,
    },
  },
  { _id: false }
);

const examSchema = new mongoose.Schema(
  {
    subjects: {
      type: [subjectSchema],
      default: [],
    },
  },
  { _id: false }
);

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

    academicYear: {
      type: String,
      default: "2025-26",
    },

    teacherName: String,
    remarks: String,

    exams: {
      unitTest1: {
        type: examSchema,
        default: () => ({ subjects: [] }),
      },

      unitTest2: {
        type: examSchema,
        default: () => ({ subjects: [] }),
      },

      project1: {
        type: examSchema,
        default: () => ({ subjects: [] }),
      },

      halfYearly: {
        type: examSchema,
        default: () => ({ subjects: [] }),
      },

      unitTest3: {
        type: examSchema,
        default: () => ({ subjects: [] }),
      },

      unitTest4: {
        type: examSchema,
        default: () => ({ subjects: [] }),
      },

      project2: {
        type: examSchema,
        default: () => ({ subjects: [] }),
      },

      finalExam: {
        type: examSchema,
        default: () => ({ subjects: [] }),
      },
    },
  },
  {
    timestamps: true,
  }
);

marksSchema.index(
  {
    studentId: 1,
    academicYear: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Marks", marksSchema);