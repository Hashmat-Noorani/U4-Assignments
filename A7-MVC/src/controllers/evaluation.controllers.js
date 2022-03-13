const express = require("express");
const Evaluation = require("../models/evaluation.model");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    const evaluation = await Evaluation.create(req.body);
    res.status(201).send(evaluation);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .populate("instructorId")
      .populate("batchId")
      .lean()
      .exec();
    res.status(200).send(evaluations);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
