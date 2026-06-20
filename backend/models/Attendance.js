
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
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

    month: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    totalDays: {
      type: Number,
      required: true,
    },

    presentDays: {
      type: Number,
      required: true,
    },

    absentDays: {
      type: Number,
      required: true,
    },

    attendancePercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

attendanceSchema.index(
  {
    studentId: 1,
    month: 1,
    year: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);

