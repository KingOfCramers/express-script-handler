var appRoot = require("app-root-path");
var winston = require("winston");

// define the custom settings for each transport (file, console)
var options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: "info",
    handleExceptions: true,
    stderrLevels: ["error"],
    silent: process.env.SILENT === "true",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

var writer = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file)
  ]
})

logger.stream = {
  write: function(message, encoding) {
    // This stream.write 
    // is only ever accessed by morgan, which sends our server pings here
    writer.info(message);
  }
};

module.exports = logger;

// const winston = require("winston");
// const { format, transports } = require("winston");
//
// const logger = winston.createLogger({
//   transports: [
//     new transports.Console({
//       level: process.env.LOG_LEVEL,
//       silent: process.env.SILENT === 'true',
//       format: format.combine(
//         format.timestamp(),
//         format.colorize(),
//         format.errors({ stack: true })
//       )
//     })
//   ]
// });
//
// module.exports = logger;
