const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    evaluationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "evaluation",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    marks: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = mongoose.model("submission", submissionSchema);
