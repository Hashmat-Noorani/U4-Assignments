const express = require("express");
const app = express();

app.get("/books", allBooks, (req, res) => {});
app.get("/books/:bookName", singleBook, (req, res) => {
  res.send({ bookName: req.name });
});
function allBooks(req, res, next) {
  console.log("Fetching all books");
  return next();
}
function singleBook(req, res, next) {
  req.name = req.params.bookName;
  return next();
}
app.listen(5000, () => {
  console.log("Listening on Port 5000");
});
