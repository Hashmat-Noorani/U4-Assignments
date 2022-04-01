const express = require("express");
const User = require("../models/user.model");
const client = require("../configs/redis");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const users = await User.find().lean().exec();
    client.set("users", JSON.stringify(users));
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("", async (req, res) => {
  client.get("users", async (err, reply) => {
    if (err) throw err;
    if (reply)
      return res.status(200).send({ users: JSON.parse(reply), redis: true });
    try {
      const users = await User.find().lean().exec();
      return res.status(200).send({ users });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
});

router.patch("/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    })
      .lean()
      .exec();
    const users = await User.find().lean().exec();
    client.set("users", JSON.stringify(users));
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId).lean().exec();
    const users = await User.find().lean().exec();
    client.set("users", JSON.stringify(users));
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;
