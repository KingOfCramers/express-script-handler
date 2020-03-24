const app = require("../app");
const request = require("supertest");

describe("Test the home page", () => {
  test("It should give a 200 response.", done => {
    request(app)
      .get("/")
      .then(res => {
        expect(res.statusCode).toBe(200);
        done();
      })
  })
});

