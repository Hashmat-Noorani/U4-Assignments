const { createClient } = require("redis");
const client = createClient({ url: "redis://localhost:6379" });

client.on("error", (err) => {
  console.log({ error: err.message });
});

module.exports = client;
