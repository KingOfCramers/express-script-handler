const morgan = require("morgan");
const chalk = require("chalk");
const winston = require("../winston");

// Send colorized errors to console...
const morganConsoleErr = morgan((tokens,req,res) => {
  return [
    chalk.bold(tokens.method(req, res)),
    tokens['remote-addr'](req, res),
    tokens['remote-user'](req, res),
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
const morganConsoleRes = morgan((tokens,req,res) => {
  return [
    chalk.bold(tokens.method(req, res)),
    tokens['remote-addr'](req, res),
    tokens['remote-user'](req, res),
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
const morganToWinston = morgan((tokens,req,res) => {
  return [
    tokens.method(req, res),
    tokens['remote-addr'](req, res),
    tokens['remote-user'](req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
}, {
  stream: winston.stream,
});

module.exports = {
  morganConsoleErr,
  morganConsoleRes,
  morganToWinston,
}
