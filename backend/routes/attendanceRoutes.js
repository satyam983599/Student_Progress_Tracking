
const express = require("express");

const router = express.Router();

const {
  saveAttendance,
  getStudentAttendance,
} = require(
  "../controllers/attendanceController"
);

router.post(
  "/save",
  saveAttendance
);

router.get(
  "/student/:id",
  getStudentAttendance
);

module.exports = router;

