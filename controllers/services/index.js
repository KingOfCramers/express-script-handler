const { deleteHash, deleteHashWithKey } = require("../../dbs/redis/services");

module.exports = {
  deleteRedisHash: async ({ hash }) => {
    const success = await deleteHash({ hash });
    if (success) {
      return {
        status: 200,
        msg: "Hash was deleted."
      };
    }
    return {
      status: 404,
      msg: "That hash/key combination could not be found."
    };
  },
  deleteRedisHashWithKey: async ({ hash, key }) => {
    const success = await deleteHashWithKey({ hash, key });
    if (success) {
      return {
        status: 200,
        msg: "Key was deleted."
      };
    }
    return {
      status: 404,
      msg: "That hash/key combination could not be found."
    };
  }
};
