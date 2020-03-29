const morgan = require("morgan");
const chalk = require("chalk");
const winston = require("../winston");


// Send colorized errors to console...
const errLogger = morgan((tokens,req,res) => {
  return [
    chalk.bold(tokens.method(req, res)),
    tokens['remote-addr'](req, res),
    tokens['remote-user'](req, res),
    tokens.date(req,res, 'iso'),
    chalk.yellow(tokens.url(req, res)),
    chalk.red(tokens.status(req, res)),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ') 
}, {
    skip: function (req, res) {
      return res.statusCode < 400 || process.env.SILENT === 'true'
    }, 
    stream: process.stderr
});

// Send colorized res to console
const resLogger = morgan((tokens,req,res) => {
  return [
    chalk.bold(tokens.method(req, res)),
    tokens['remote-addr'](req, res),
    tokens['remote-user'](req, res),
    tokens.date(req,res, 'iso'),
    chalk.yellow(tokens.url(req, res)),
    chalk.green(tokens.status(req, res)),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ') 
}, {
    skip: function (req, res) {
      return res.statusCode >= 400 || process.env.SILENT === 'true'
    }, 
    stream: process.stdout
});

// Send non-colorized to winston stream for writing (bypassing console)...
const winstonLogger = morgan((tokens,req,res) => {
  return [
    tokens.method(req, res),
    tokens['remote-addr'](req, res),
    tokens['remote-user'](req, res),
    tokens.date(req,res, 'iso'),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ') 
}, {
  stream: winston.stream,
});

module.exports = {
  errLogger,
  resLogger,
  winstonLogger,
}
