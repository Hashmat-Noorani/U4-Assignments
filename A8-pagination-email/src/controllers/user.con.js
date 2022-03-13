const express = require("express");
const User = require("../models/user.mod");
const transporter = require("../configs/mail");
const router = express.Router();

// pagination
router.get("", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 20;
    const skip = (page - 1) * size;
    const users = await User.find().skip(skip).limit(size).lean().exec();
    const totalpages = Math.ceil(
      (await User.find().countDocuments().lean().exec()) / size
    );
    res.status(200).send({ users, totalpages });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//email part
router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);
    transporter.sendMail({
      from: '"hashtech" <hashmatwani@hashtech.com>', // sender address
      to: user.email, // list of receivers
      subject: `Welcome to hashtech system ${user.first_name} ${user.last_name}`, // Subject line
      text: `Hi ${user.first_name}, Please confirm your email address`, // plain text body
      html: `<b>Hi ${user.first_name}, Please confirm your email address</b>`, // html body
    });
    res.status(201).send("successful");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;
