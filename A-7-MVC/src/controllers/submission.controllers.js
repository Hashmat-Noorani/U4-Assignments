const express = require("express");
const Submission = require("../models/submission.model");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    const submission = await Submission.create(req.body);
    res.status(201).send(submission);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const submissions = await Submission.find().lean().exec();
    res.status(200).send(submissions);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//student with highest marks in evaluation
router.get("/topper", async (req, res) => {
  try {
    const topper = await Submission.find({}, { studentId: 1, marks: 1, _id: 0 })
      .sort({ marks: -1 })
      .limit(1)
      .populate("studentId")
      .lean()
      .exec();
    res.status(200).send(topper);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
//students who submits the particular evaluation
router.get("/:evaluationId", async (req, res) => {
  try {
    const students = await Submission.find(
      {
        evaluationId: req.params.evaluationId,
      },
      { studentId: 1, _id: 0 }
    )
      .populate("studentId")
      .lean()
      .exec();
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
