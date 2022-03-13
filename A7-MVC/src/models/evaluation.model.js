const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    dateOfEvaluation: { type: String, required: true },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batch",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = mongoose.model("evaluation", evaluationSchema);
