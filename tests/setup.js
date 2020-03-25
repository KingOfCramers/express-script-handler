// Jest will run this during startup, see the jest.config.js file.
require("dotenv").config({ path: "./envs/.test.env" });

module.exports = () => {
  const connect = require("../dbs/mongodb/connect");
  const { senate, house } = require("../dbs/mongodb/schemas");
  const { sfrc, hfac, large } = require("./data");
  const SFRC = senate[0];
  const HFAC = house[0];
  const HAPC = house[1];
  let db;
  beforeEach(async () => {
    // Connect to DB.
    db = await connect();
    // Import and set default data.
    let sfrc_one = new SFRC(sfrc[0]);
    let sfrc_two = new SFRC(sfrc[1]);
    let hfac_one = new HFAC(hfac[0]);
    let hfac_two = new HFAC(hfac[1]);
    // Save data
    await sfrc_one.save();
    await sfrc_two.save();
    await hfac_one.save();
    await hfac_two.save();
    // Create data in mongoose that exceeds redis buffer.
    await HAPC.insertMany(large);
  });

  afterEach(async () => {
    // Delete data
    await SFRC.deleteMany({});
    await HFAC.deleteMany({});
  });

  afterAll(async () => {
    // Delete data
    await SFRC.deleteMany({});
    await HFAC.deleteMany({});
    await HAPC.deleteMany({});
    // Disconnect from database.
    await db.disconnect();
  });
};
