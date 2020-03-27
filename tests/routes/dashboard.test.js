const app = require("../../app");
const request = require("supertest");
require("../setup")();

describe("Fetch HTML", () => {
  test("Successful call to dashboard", async done => {
    let res = await request(app).get("/dashboard/");
    expect(res.type).toBe("text/html");
    done();
  });
  test("Fetch JS Bundle", async done => {
    let res = await request(app).get("/dashboard/bundle.js");
    expect(res.type).toBe("application/javascript");
    done();
  });
});
