const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    fatherName: String,
    motherName: String,
    guardianName: String,

    phone: String,
    address: String,

    class: { type: Number, required: true },
    section: { type: String, required: true },

    // ✅ ONLY THIS (NO EXTRA index())
    rollNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    academicYear: {
      type: String,
      default: "2025-26",
    },
  },
  { timestamps: true }
);

// ❌ REMOVE THIS IF PRESENT
// studentSchema.index({ rollNumber: 1 });

module.exports = mongoose.model("Student", studentSchema);