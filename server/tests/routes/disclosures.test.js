const app = require("../../app");
const request = require("supertest");
require("../setup")();
const client = require("../../dbs/redis/client");

describe("Testing query of disclosure routes", () => {

  test("Query all senators data", async done => {
    // Query MongoDB and Check data...
    let res = await request(app).get("/data/disclosures/senators");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    let detail = res.body[0].title;
    expect(detail).toBe("Periodic Transaction Report for 12/11/2017");
    // Ensure the query was saved to the Redis database...
    let redisData = JSON.parse(await client.hget('senators', '{}'));
    expect(Array.isArray(redisData));
    expect(redisData[0].type === detail);
    done();
  });

  test("Query all senateCandidate data", async done => {
    // Query MongoDB and Check data...
    let res = await request(app).get("/data/disclosures/senatecandidates");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    let detail = res.body[0].title;
    expect(detail).toBe("Candidate Report Due Date Extension 1");
    // Ensure the query was saved to the Redis database...
    let redisData = JSON.parse(await client.hget('senatecandidates', '{}'));
    expect(Array.isArray(redisData));
    expect(redisData[0].type === detail);
    done();
  });

  test("Disallow improper collection", async done => {
    let res = await request(app).get("/data/disclosures/thisisnotreal");
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("That collection could not be found.");
    done();
  });

  test("Query senators by type", async done => {
    // Query MongoDB and Check data...
    let res = await request(app).get("/data/disclosures/senators?date=12/11/2017");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    expect(res.body.length === 1);
    let detail = res.body[0].first;
    expect(detail).toBe("Sheldon");
    //// Ensure the query was saved to the Redis database...
    let redisData = JSON.parse(await client.hget('senators', '{"date":"12/11/2017"}'));
    expect(Array.isArray(redisData));
    expect(redisData[0].type === detail);
    done();
  });

  test("Query senatecandidates by type", async done => {
    // Query MongoDB and Check data...
    let res = await request(app).get("/data/disclosures/senatecandidates?date=05/07/2018");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    expect(res.body.length === 1);
    let detail = res.body[0].first;
    expect(detail).toBe("Deedra");
    //// Ensure the query was saved to the Redis database...
    let redisData = JSON.parse(await client.hget('senatecandidates', '{"date":"05/07/2018"}'));
    expect(Array.isArray(redisData));
    expect(redisData[0].type === detail);
    done();
  });

  test("Don't allow POST", async done => {
    // Attempt post route.
    let res = await request(app).post("/data/house/hfacs");
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe("This is not a valid url.")
    done();
  });


});
