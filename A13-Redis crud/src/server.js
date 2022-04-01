const app = require("./index");
const connect = require("./configs/mongo");
app.listen(6180, async () => {
  try {
    await connect();
    console.log("Listening on port 6180");
  } catch (err) {
    console.log(err);
  }
});
