const logger = require("../../../logger");
const redis = require("redis");
let client = redis.createClient(process.env.REDIS_URL);

client.on("error", err => logger.error(err));
client.on("connect", _ => logger.info("Redis connected."));

module.exports = client;
