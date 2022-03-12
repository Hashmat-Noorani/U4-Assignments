const express = require("express");
const Student = require("../models/student.model");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const students = await Student.find()
      .populate("userId")
      .populate("batchId")
      .lean()
      .exec();
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
