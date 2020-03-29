const { deleteHash } = require("../../dbs/redis/services");

module.exports = {
  deleteRedisHash: async ({ key, hash }) => {
    const success = await deleteHash({ key, hash });
    if (success) {
      return {
        status: 200,
        msg: "Hash was deleted."
      };
    } else {
      return {
        status: 404,
        msg: "That hash could not be found."
      };
    }
  }
};
