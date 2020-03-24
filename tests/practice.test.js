const connect = require("../dbs/mongodb/connect");
const app = require("../app");
const request = require("supertest");

beforeEach(() => {
  // Set global variables for the tests. 
});

describe("This is the test", () => {
  test("This should work", async done => {
    await connect();
    let res = await request(app).get("/home");
    expect(res.statusCode).toBe(200);
    done();
  })
});
