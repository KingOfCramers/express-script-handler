// Jest will run this during startup, see the jest.config.js file.
require("dotenv").config({ path: "./envs/.test.env" });

module.exports = () => {
  // Connect to MongoDB databse...

  const connect = require("../dbs/mongodb/connect");
  const { senate, house } = require("../dbs/mongodb/schemas");
  const { sfrc, hfac } = require("./data");
  const SFRC = senate[0];
  const HFAC = house[0];

  let db;
  beforeAll(async () => {
    // Connect to DB.
    db = await connect();

    // Import and set default data.
    let sfrc_one = new SFRC(sfrc[0]);
    let sfrc_two = new SFRC(sfrc[1]);
    let hfac_one = new HFAC(hfac[0]);
    let hfac_two = new HFAC(hfac[1]);

    await sfrc_one.save();
    await sfrc_two.save();
    await hfac_one.save();
    await hfac_two.save();

  });
  afterAll(async () => {
    await SFRC.deleteMany({});
    await HFAC.deleteMany({});
    await db.disconnect();
  });
};
