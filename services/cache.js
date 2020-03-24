const mongoose = require("mongoose");
const util = require("util");
const objSize = require("object-sizeof");
let client = require("../dbs/redis/client");
const logger = require("../logger");

client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec; // The original exec function.

mongoose.Query.prototype.cache = function() {
  this.useCache = true;
  return this; // Return the query to make it chainable.
}

mongoose.Query.prototype.exec = async function() {
  if(!this.useCache){
    return exec.apply(this, arguments);
  }

  const namespace = this.mongooseCollection.name;
  const query = JSON.stringify(this.getQuery());
  //const keyJSON = Object.assign({}, { collection: this.mongooseCollection.name }, this.getQuery());
  //const key = JSON.stringify(keyJSON);
  const cachedValue = await client.hget(namespace, query);
  if(cachedValue){
    logger.info('Returning from cache.');
    let redisData = JSON.parse(cachedValue);
    let hydratedRedisData = Array.isArray(redisData) 
      ? redisData.map(doc => new this.model(doc)) 
      : new this.model(redisData);
    return hydratedRedisData;
  }
  
  const result = await exec.apply(this, arguments); // Execute the original mongoose search.
  // Don't cache empty result
  if(Array.isArray(result) && result.length === 0){
    return result;
  }
  let size = objSize(result); // Size returns in bytes.
  if(size > process.env.MAX_CACHE_SIZE_IN_MB*1000000){
    logger.info(`Value exceeds the ${process.env.MAX_CACHE_SIZE_IN_MB}mb maximum for caching in redis`);
  } else {
    logger.info('Creating new value in cache.');
    client.hset(namespace, query, JSON.stringify(result)); // Turn mongoose model into string, save in redis.
  }

  return result;
};
