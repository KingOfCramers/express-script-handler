const mongoose = require("mongoose");
const util = require("util");
const redis = require("redis");
const logger = require("../logger")(module);
const redisUrl = "redis://localhost:6379";
let client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec; // The original exec function.

mongoose.Query.prototype.cache = function() {
  this.useCache = true;
  return this; // Return the query to make it chainable.
}

mongoose.Query.prototype.exec = async function() {
  if(!this.useCache){
    return exec.apply(this, arguments);
  }

  logger.info('Using cache.')
  const keyJSON = Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name });
  const key = JSON.stringify(keyJSON);
  const cachedValue = await client.get(key);
  if(cachedValue){
    logger.info('Returning from cache.');
    let redisData = JSON.parse(cachedValue);
    let hydratedRedisData = Array.isArray(redisData) 
      ? redisData.map(doc => new this.model(doc)) 
      : new this.model(redisData);
    return hydratedRedisData;
  }
  
  logger.info('Creating new value in cache.')
  const result = await exec.apply(this, arguments); // Execute the original mongoose search.
  client.set(key, JSON.stringify(result), 'EX', 10); // Turn mongoose model into string, save in redis.
  return result;
};
