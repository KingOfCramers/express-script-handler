const connect = require("../dbs/mongodb/connect");
const app = require("../app");
const request = require("supertest");

let db;
beforeAll(async() => {
  db = await connect();
});

afterAll(async() => {
   await db.disconnect();
})

describe("This is the test", () => {
  test("This should work", async done => {
    let res = await request(app).get("/home");
    expect(res.statusCode).toBe(200);
    done();
  })
});
