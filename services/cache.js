const mongoose = require("mongoose");
const util = require("util");
const redis = require("redis");
const redisUrl = "redis://localhost:6379";
let client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec; // The original exec function.

mongoose.Query.prototype.exec = async function() {

  const keyJSON = Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name });
  const key = JSON.stringify(keyJSON);

  const cachedValue = await client.get(key);
  if(cachedValue){
    let redisData = JSON.parse(cachedValue);
    let hydratedRedisData = Array.isArray(redisData) 
      ? redisData.map(doc => new this.model(doc)) 
      : new this.model(redisData);
    console.log('Returning from cache')
    return hydratedRedisData;
  }

  const result = await exec.apply(this, arguments); // Execute the original mongoose search.
  client.set(key, JSON.stringify(result)); // Turn mongoose model into string, save in redis.
  return result;
};
//let { minDate, maxDate } = req.query;
//const util = require("util");
//const redis = require("redis");
//const redisUrl = "redis://localhost:6379";
//let client = redis.createClient(redisUrl);
//client.get = util.promisify(client.get);

//const cachedData = await client.get(source);
//if (cachedData){
//console.log("SERVING FROM CACHE");
//return res.send(cachedData);
//client.set(source, JSON.stringify(data));
