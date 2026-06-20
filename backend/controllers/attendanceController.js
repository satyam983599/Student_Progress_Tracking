const Attendance = require("../models/Attendance");

exports.saveAttendance = async (req, res) => {
  try {
    const { records } = req.body;

    for (const item of records) {
      const attendancePercentage =
        item.totalDays > 0
          ? (
              (item.presentDays /
                item.totalDays) *
              100
            ).toFixed(2)
          : 0;

      await Attendance.findOneAndUpdate(
        {
          studentId: item.studentId,
          month: item.month,
          year: item.year,
        },
        {
          ...item,
          attendancePercentage,
        },
        {
          upsert: true,
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Attendance Saved Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      studentId: req.params.id,
    });

    let totalDays = 0;
    let presentDays = 0;

    records.forEach((item) => {
      totalDays += Number(item.totalDays || 0);
      presentDays += Number(item.presentDays || 0);
    });

    const absentDays = totalDays - presentDays;

    const attendancePercentage =
      totalDays > 0
        ? (
            (presentDays / totalDays) *
            100
          ).toFixed(2)
        : 0;

    res.status(200).json({
      success: true,
      attendance: {
        totalDays,
        presentDays,
        absentDays,
        attendancePercentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};