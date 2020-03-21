const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const scripts = require("./routes/scripts");
const data = require("./routes/data");
const connect = require("./dbs/mongodb/connect");
const logger = require("./logger");

require("./services/cache.js"); // Modify monogose exec function
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, 
    stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, 
    stream: process.stdout 
}));

app.use("/scripts", scripts);
app.use("/data", data);

connect()
  .then(_ => {
    app.listen(process.env.PORT, () => {
      logger.info(`Running app in ${process.env.NODE_ENV} on port ${process.env.PORT}`);
    }) 
  })
  .catch(err => {
    logger.info(`Could not connect to mongodb`, err)
  });
