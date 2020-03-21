const winston = require("winston");
const { format, transports } = require("winston");
const path = require("path");
const moment = require("moment");

// module's filename.
const getLabel = function(callingModule) {
  const parts = callingModule.filename.split(path.sep);
  return path.join(parts[parts.length - 2], parts.pop());
};

const level = process.env.LOG_LEVEL || "debug";

const logger = winston.createLogger({
  transports: [
    new transports.Console({
      level,
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.errors({ stack: true })
      )
    })
  ]
});

module.exports = logger;
