const logger = require("../../../logger");
const redis = require("redis");
const redisUrl = "redis://localhost:6379";
let client = redis.createClient(redisUrl);

client.on("error", err => logger.error(err));
client.on("connect", _ => logger.info("Redis connected."));

module.exports = client;
