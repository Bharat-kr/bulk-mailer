const redis = require("redis");

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.connect();

client.on("error", (err) => {
  console.log("Error " + err);
});

module.exports = client;
