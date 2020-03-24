const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const authentication = require("./middleware/authentication");

const home = require("./routes/home");
const scripts = require("./routes/scripts");
const data = require("./routes/data");

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

app.use("/home", home);
app.use("/scripts", authentication, scripts);
app.use("/data", data);

module.exports = app;
