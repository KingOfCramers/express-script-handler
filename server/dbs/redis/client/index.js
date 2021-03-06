const logger = require("@logger");
const util = require("util");
const redis = process.env.NODE_ENV === 'test' 
  ? require("redis-mock") 
  : require("redis");

let client = redis.createClient(process.env.REDIS_URL);

client.hget = util.promisify(client.hget);
client.hdel = util.promisify(client.hdel);
client.del = util.promisify(client.del);

client.on("error", err => logger.error(err));
client.on("connect", _ => logger.info("Redis connected."));

module.exports = client;

