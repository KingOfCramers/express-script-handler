const winston = require("winston");
const { format, transports } = require("winston");
const path = require("path");
const moment = require("moment");

const logger = winston.createLogger({
  transports: [
    new transports.Console({
      level: process.env.LOG_LEVEL,
      silent: process.env.SILENT,
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.errors({ stack: true })
      )
    })
  ]
});

module.exports = logger;
