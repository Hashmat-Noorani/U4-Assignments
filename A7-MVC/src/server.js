const app = require("./index");
const connect = require("./configs/db");
app.listen(6180, async (req, res) => {
  try {
    await connect();
    console.log("Listening on port 6180");
  } catch (err) {
    console.log(err);
  }
});
