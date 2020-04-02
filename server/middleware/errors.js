const { MongoError } = require("mongodb");
const logger = require("../loggers/winston");
module.exports = {
  handleMongoError: (error, req, res, next) => {
    if (error instanceof MongoError) {
      logger.error(error.stack);
      return res.status(500).json({
        type: "MongoError",
        message: error.message
      });
    }
    next(error);
  },
  handleGenericError: (error, req, res, next) => {
    logger.error(error.stack);
    return res.status(500).json({
      type: "ServerError",
      message: error.message
    });
  }
};
