const { connect } = require("mongoose");

const dbConnect = () => {
  return connect("mongodb+srv://hashmat:hashmat@redis.lhr70.mongodb.net/crudRedis");
};
module.exports = dbConnect;
