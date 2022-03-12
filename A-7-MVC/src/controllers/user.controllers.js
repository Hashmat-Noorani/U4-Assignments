const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
