const app = require("../../app");
const request = require("supertest");
require("../setup")();

describe("Testing house no-query route", () => {
  test("Successful query for all resources", async done => {
    let res = await request(app).get("/data/house/hfacs");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body));
    expect(res.body[0].type).toBe("hearing");
    done();
  })
});
