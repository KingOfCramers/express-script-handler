const app = require("../../app");
const request = require("supertest");
require("../setup")();
const client = require("../../dbs/redis/client");

describe("Testing 404 route", () => {
  test("Successful call to 404 route", async done => {
    let res = await request(app).get("/nonexistentroute");
    expect(res.statusCode).toBe(404);
    expect(res.text).toEqual('This is not a valid url.');
    done();
  })
});

describe(`Doesn't cache values over process.env.MAX_CACHE_SIZE_IN_MB (${process.env.MAX_CACHE_SIZE_IN_MB}mb)`, () => {
  test("Doesn't cache call, but returns data", async done => {
    let res = await request(app).get("/data/house/hapcs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    // Ensure the query was NOT saved to the Redis database...
    let redisData = JSON.parse(await client.hget('hapcs', '{}'));
    expect(redisData).toBe(null);
    done();
  });
  });
