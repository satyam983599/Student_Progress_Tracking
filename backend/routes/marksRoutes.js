const express = require("express");

const router = express.Router();

const {
  saveMarks,
} = require("../controllers/marksController");

const {
  getInstantReport,
} = require("../controllers/reportController");

router.post("/upload", saveMarks);

router.get(
  "/report/:id",
  getInstantReport
);

module.exports = router;