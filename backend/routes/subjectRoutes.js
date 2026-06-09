const express = require("express");
const router = express.Router();

const Subject = require("../models/Subject");

/*
========================
GET ALL SUBJECTS
========================
*/
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find().sort({
      subjectName: 1,
    });

    res.json({
      success: true,
      subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/*
========================
ADD SUBJECT
========================
*/
router.post("/add", async (req, res) => {
  try {
    const { subjectName, subjectCode } = req.body;

    const exists = await Subject.findOne({
      $or: [
        { subjectName },
        { subjectCode },
      ],
    });

    if (exists) {
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
      error: error.message,
    });
  }
});

/*
========================
DELETE SUBJECT
========================
*/
router.delete("/:id", async (req, res) => {
  try {
    await Subject.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Subject deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;