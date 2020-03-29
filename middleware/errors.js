const { MongoError } = require("mongodb");
module.exports = {
  handleMongoError: (error, req, res, next) => {
    if (error instanceof MongoError) {
      return res.status(500).json({
        type: "MongoError",
        message: error.message
      });
    }
    next(error);
  },
  handleGenericError: (error, req, res, next) => {
    return res.status(500).json({
      type: "ServerError",
      message: error.message
    })
  }
};
