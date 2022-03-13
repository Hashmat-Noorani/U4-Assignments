const express = require("express");

const usersController = require("./controllers/user.controllers");
const batchesController = require("./controllers/batch.controllers");
const studentsController = require("./controllers/student.controllers");
const evaluationsController = require("./controllers/evaluation.controllers");
const submissionsController = require("./controllers/submission.controllers");

const app = express();
app.use(express.json());

app.use("/users", usersController);
app.use("/batches", batchesController);
app.use("/students", studentsController);
app.use("/evaluations", evaluationsController);
app.use("/submissions", submissionsController);

module.exports = app;
