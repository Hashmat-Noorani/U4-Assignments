const express = require("express");
const router = express.Router();
const Batch = require("../models/batch.model");

router.post("", async (req, res) => {
  try {
    const batch = await Batch.create(req.body);
    res.status(201).send(batch);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const batches = await Batch.find().lean().exec();
    res.status(200).send(batches);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
