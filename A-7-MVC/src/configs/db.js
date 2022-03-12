const { connect } = require("mongoose");

const dbConnect = () => {
  return connect("mongodb://127.0.0.1:27017/relationships");
};
module.exports = dbConnect;
