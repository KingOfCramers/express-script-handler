const app = require("@app");
const request = require("supertest");
require("../setup")();

describe("Testing metadata query of HFAC", () => {
  test("Return paths", async done => {
    // Query MongoDB and Check data...
    let res = await request(app).get("/data/meta/keys/house/hfacs");
    expect(res.statusCode).toBe(200);
    expect(typeof res.body === 'object')
    expect(Object.keys(res.body).includes(["type", "link", "title", "date", "_id"]));
    done();
  });
});
