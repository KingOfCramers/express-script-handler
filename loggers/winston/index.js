var appRoot = require("app-root-path");
var winston = require("winston");
require("winston-daily-rotate-file"); // Attaches new transport to winston.transports

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

// Log rotation
const transport = new (winston.transports.DailyRotateFile)({
  filename: `API_${process.env.NODE_ENV}.log`,
  dirname: 'logs',
  frequency: null, // Rely on date pattern, rotate daily
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d',
});

transport.on('rotate', (oldFileName, newFilename) => {
  console.log(`ROTATING LOGS. OLD: ${oldFileName}  -- NEW: ${newFilename}`);
});

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger({
  transports: [
    //new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    transport
  ],
  exitOnError: false // do not exit on handled exceptions
});

var writer = new winston.createLogger({
  transports: [
    transport
    //new winston.transports.File(options.file)
  ]
})

logger.stream = {
  write: function(message, encoding) {
    // This stream.write is only ever accessed by morgan, which sends our server pings here
    writer.info(message);
  }
};

module.exports = logger;
