module.exports = {
  find: async (Model, query) => {
    let data = await Model.find({ ...query }).cache();
    data = data.map(datum => datum.toObject());
    return data;
  }
};
