const client = require("../client");
const logger = require("../../../loggers/winston");

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
  }
}
