const app = require("../../app");
const request = require("supertest");
require("../setup")();

describe("Testing home route", () => {
  test("Successful call to home route", async done => {
    let res = await request(app).get("/home");
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('This endpoint will serve up the dashboard');
    done();
  })
});
