const app = require("../../app");
const request = require("supertest");
require("../setup")();
const client = require("../../dbs/redis/client");

describe("Testing house no-query route", () => {
  test("Successful query for all resources", async done => {
    
    // Query MongoDB and Check data...
    let res = await request(app).get("/data/house/hfacs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    let detail = res.body[0].type;
    expect(detail).toBe("hearing");
    
    // Ensure the query was saved to the Redis database...
    let redisData = JSON.parse(await client.hget('hfacs', '{}'));
    expect(Array.isArray(redisData));
    expect(redisData[0].type === detail);
    done();
  })
});
