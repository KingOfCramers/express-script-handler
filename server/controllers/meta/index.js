module.exports = {
  getKeys: async (Model) => {
    let keys = Model.schema.paths;
    return { ...keys };
  }
};
