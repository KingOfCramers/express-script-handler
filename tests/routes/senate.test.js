const app = require("../../app");
const request = require("supertest");
require("../setup")();
const client = require("../../dbs/redis/client");

describe("Testing query of Senate routes", () => {

  test("Query all data", async done => {
    // Query MongoDB and Check data...
    let res = await request(app).get("/data/senate/sfrcs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    let detail = res.body[0].type;
    expect(detail).toBe("hearing");
    // Ensure the query was saved to the Redis database...
    let redisData = JSON.parse(await client.hget('sfrcs', '{}'));
    expect(Array.isArray(redisData));
    expect(redisData[0].type === detail);
    done();
  });

  test("Disallow improper collection", async done => {
    let res = await request(app).get("/data/senate/thisisnotreal");
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("That collection could not be found.");
    done();
  });

  test("Query by type", async done => {
    // Query MongoDB and Check data...
    let res = await request(app).get("/data/senate/sfrcs?title=Strengthening Security and the Rule of Law in Mexico");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    expect(res.body.length === 1);
    let detail = res.body[0].type;
    expect(detail).toBe("hearing");
    // Ensure the query was saved to the Redis database...
    let redisData = JSON.parse(await client.hget('sfrcs', '{}'));
    expect(Array.isArray(redisData));
    expect(redisData[0].type === detail);
    done();
  });

  test("Don't allow POST", async done => {
    // Attempt post route.
    let res = await request(app).post("/data/house/sfrcs");
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("This is not a valid url.")
    done();
  });


});
