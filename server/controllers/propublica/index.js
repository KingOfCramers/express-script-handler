const axios = require("axios");
const moment = require("moment");
const { getRedisDataOrUseCallback } = require("../../dbs/redis/services");

module.exports = {
  statements: async ({ date, offset, options }) => {
    let isDateValid = moment(date, "YYYY-MM-DD").format("YYYY-MM-DD") === date;
    let isOffsetValid = !isNaN(offset) && Number.isInteger(offset / 20);
    if (!isDateValid || !isOffsetValid) {
      return {
        status: 400,
        msg: "That is not a valid query."
      };
    }

    let link = `https://api.propublica.org/congress/v1/statements/date/${date}.json?offset=${offset}`;

    // Check to see if we have cached this query in our Redis server.

    let fetchData = async () => {
      let res = await axios.get(link, options);
      return res.data.results;
    };

    let data = await getRedisDataOrUseCallback({
      key: "statements",
      hash: `${date}:${offset}`,
      callback: fetchData
    });

    return {
      status: 200,
      msg: data
    };
  }
};
