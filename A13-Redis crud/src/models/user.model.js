const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    gender: { type: String, required: true, default: "male" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);
