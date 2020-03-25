const mongoose = require("mongoose");
const logger = require("../../../loggers/winston");

module.exports = async () => {

  let options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    user: process.env.MONGODB_USER, 
    pass: process.env.MONGO_PASS
  };

  let db = await mongoose.connect(process.env.MONGODB_URI, options);
  logger.info("Connected to MongoDb.");

  process.on("SIGINT", async () => {
    logger.info("SIGINT SIGNAL RECIEVED");
    try {
      await db.disconnect();
      logger.info("Closed DB Connection.");
      process.exit(0);
    } catch (err) {
      logger.error("There was a problem closing the db", err);
      process.exit(1);
    }
  });

  return db;
};
