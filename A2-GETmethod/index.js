const express = require("express");
const app = express();
// console.log(app);
app.get("", (req, res) => {
  res.send("Hello");
});
app.get("/books", (req, res) => {
  res.send({ Math: 10, science: 20, english: 30, DSA: 50 });
});
app.listen(5000, () => {
  console.log("listening on port 5000");
});
