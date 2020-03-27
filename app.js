const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
//const authentication = require("./middleware/authentication");
const { errLogger, resLogger } = require("./loggers/morgan");
const data = require("./routes/data");

require("./services/cache.js"); // Modify monogose exec function
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errLogger);
app.use(resLogger);
app.use("/data", data);

const publicPath = path.join(__dirname, "frontend", "dist");
app.use("/home", express.static(publicPath));

app.use("*", (req,res) => {
  res.status(404);
  res.send("This is not a valid url.");
});

module.exports = app;
