module.exports = async (Model, query) => {
  let data = await Model.find({ ...query });
  data = data.map(datum => datum.toObject());
  return data;
};
