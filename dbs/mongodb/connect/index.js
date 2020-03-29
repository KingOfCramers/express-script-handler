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

  try {
    mongoose.connect(process.env.MONGODB_URI, options);
  } catch (err) {
    logger.error("Could not connect to DB.");
    process.exit(1);
  }

  const db = mongoose.connection;

  db.on("error", err => {
    logger.error("Error occured in MongoDB.", err);
  });

  db.on("disconnected", () => {
    logger.error("Connection to MongoDB closed.")
  });

  db.once("open", () => {
    logger.info("Connection to MongoDB opened.");
  });

  return db;
};
