const Marks = require("../models/Marks");

exports.getInstantReport = async (req, res) => {
  try {
    const report = await Marks.findOne({
      studentId: req.params.id,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};