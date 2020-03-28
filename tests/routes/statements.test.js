const app = require("../../app");
const request = require("supertest");
require("../setup")();
const client = require("../../dbs/redis/client");

describe(`Returns statements on given date with offset`, () => {
  test("Returns 20 results from Propublica", async done => {
    let res = await request(app).get("/data/statements/2020-03-27");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    expect(res.body.length).toBe(20);
    expect(res.body[0].date).toBe("2020-03-27");
    // Ensure the query was saved to the Redis database...
    let redisData = await client.hget("statements", "2020-03-27:0");
    expect(JSON.parse(redisData)).toMatchObject(res.body);
    done();
  });
  test("Returns 20 results from Propublica with offset of 20", async done => {
    let res = await request(app).get("/data/statements/2020-03-27?offset=20");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    expect(res.body.length).toBe(20);
    expect(res.body[0].date).toBe("2020-03-27");
    // Ensure the query was saved to the Redis database...
    let redisData = await client.hget("statements", "2020-03-27:20");
    expect(JSON.parse(redisData)).toMatchObject(res.body);
    done();
  });
});
describe(`Rejects urls with invalid parameters`, () => {
  test("Rejects request with invalid date", async done => {
    let res = await request(app).get("/data/statements/1999-03-271");
    expect(res.statusCode).toBe(400);
    expect(res.error.text).toBe("That is not a valid query.");
    // Ensure the query was not saved to the Redis database...
    let redisData = await client.hget("statements", "1999-03-271:0");
    expect(redisData).toBe(undefined);
    done();
  });
  test("Rejects request with invalid offset", async done => {
    let res = await request(app).get("/data/statements/2020-03-27?offset=312");
    expect(res.statusCode).toBe(400);
    expect(res.error.text).toBe("That is not a valid query.");
    // Ensure the query was not saved to the Redis database...
    let redisData = await client.hget("statements", "1999-03-271:312");
    expect(redisData).toBe(undefined);
    done();
  });
});
