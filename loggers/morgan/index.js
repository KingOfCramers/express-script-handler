const morgan = require("morgan");
const chalk = require("chalk");

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
      return res.statusCode < 400 || process.env.SILENT
    }, 
    stream: process.stderr
});

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
      return res.statusCode >= 400 || process.env.SILENT
    }, 
    stream: process.stdout
});

module.exports = {
  errLogger,
  resLogger,
}
