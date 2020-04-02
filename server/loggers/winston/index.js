var winston = require("winston");
let { format } = require("winston");
require("winston-daily-rotate-file"); // Attaches new transport to winston.transports

// define the custom settings for each transport (file, console)
let consoleOptions = {
  level: "info",
  handleExceptions: true,
  stderrLevels: ["error"],
  silent: process.env.SILENT === "true",
  format: format.combine(
    format.simple(),
    format.colorize(),
    format.align()
  ),
}

// Log rotation
const transport = new (winston.transports.DailyRotateFile)({
  filename: `API_${process.env.NODE_ENV}.log`,
  dirname: 'logs',
  frequency: null, // Rely on date pattern, rotate daily
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d',
  format: format.combine(
    format.timestamp(),
    format.json()
  )
});

transport.on('rotate', (oldFileName, newFilename) => {
  console.log(`ROTATING LOGS. OLD: ${oldFileName}  -- NEW: ${newFilename}`);
});

// Handles input from Morgan.
var writer = new winston.createLogger({
  transports: [
    transport
  ]
});

// Handles logger.XX calls from within app. 
var logger = new winston.createLogger({
  transports: [
    new winston.transports.Console(consoleOptions),
    transport
  ],
  exitOnError: false // do not exit on handled exceptions
});

// Recieves message from morganToWinston
logger.stream = {
  write: function(message) {
    writer.info(message);
  }
};

module.exports = logger;
