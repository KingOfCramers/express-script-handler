module.exports = {
  find: async (Model, query) => {
    let data = await Model.find({ ...query }).maxTime(4000).cache(); // This uses Redis. See the MonkeyPatch in our services folder.
    data = data.map(datum => datum.toObject());
    return data;
  }
};
