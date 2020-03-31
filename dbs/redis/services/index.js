const client = require("../client");
const logger = require("@logger");

module.exports = {
  getRedisDataOrUseCallback: async ({ key, hash, callback }) => {
    const cachedVal = await client.hget(key, hash);
    if(cachedVal){
      logger.info("Returning from cache");
      return JSON.parse(cachedVal);
    } else {
      let data = await callback(); // Get the data from another source...
      client.hset(key, hash, JSON.stringify(data));
      return data;
    }
  },
  deleteHash: async ({ hash }) => {
    const cachedVal = await client.del(hash);
    !cachedVal && logger.error(`The hash could not be found. Hash: ${hash}`);
    return !!cachedVal
  },
  deleteHashWithKey: async ({ hash, key }) => {
    const cachedVal = await client.hdel(hash, key);
    !cachedVal && logger.error(`The hash could not be found. Hash: ${hash} Key: ${key}`);
    return !!cachedVal
  }
}
