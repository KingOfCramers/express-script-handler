// Jest will run this during startup, see the jest.config.js file.
require("dotenv").config({ path: "./envs/.test.env" });

module.exports = () => {
  const connect = require("../dbs/mongodb/connect");
  const { senate, house, disclosures } = require("../dbs/mongodb/schemas");
  const {
    sfrc,
    hfac,
    senateDisclosures,
    senateCandidateDisclosures,
    large
  } = require("./data");

  // Get schemas
  const SFRC = senate[0];
  const HFAC = house[0];
  const HAPC = house[1];
  const SENATOR = disclosures[0];
  const SENATECANDIDATE = disclosures[1];

  let db;
  beforeAll(async () => {
    // Connect to DB.
    db = await connect();
  });

  beforeEach(async () => {
    // Import and set default data.
    await SFRC.insertMany(sfrc);
    await HFAC.insertMany(hfac);
    await SENATOR.insertMany(senateDisclosures);
    await SENATECANDIDATE.insertMany(senateCandidateDisclosures);
    // Create data in mongoose that exceeds redis buffer.
    await HAPC.insertMany(large);
  });

  afterEach(async () => {
    // Delete data
    await SFRC.deleteMany({});
    await HFAC.deleteMany({});
    await SENATOR.deleteMany({});
    await SENATECANDIDATE.deleteMany({});
  });

  afterAll(async () => {
    // Delete data
    await SFRC.deleteMany({});
    await HFAC.deleteMany({});
    await HAPC.deleteMany({});
    await SENATOR.deleteMany({});
    await SENATECANDIDATE.deleteMany({});
    // Disconnect from database.
    await db.disconnect();
  });
};
