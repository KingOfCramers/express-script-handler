const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// Loggers
const { errLogger, resLogger, winstonLogger } = require("./loggers/morgan");
// Middleware
//const authentication = require("./middleware/authentication");
const { handleMongoError, handleGenericError } = require("./middleware/errors");
// Routes
const committees = require("./routes/committees");
const disclosures = require("./routes/disclosures");
const statements = require("./routes/statements");
const publicPath = path.join(__dirname, "frontend", "dist");

require("./services/cache.js"); // Modify monogose exec function
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Colorize morgan status-codes and print to console, write all requests  with winston's stream. 
app.use(errLogger);
app.use(resLogger);
app.use(winstonLogger);

app.use("/data/committees", committees);
app.use("/data/disclosures", disclosures);
app.use("/data/statements", statements);
app.use("/dashboard", express.static(publicPath));
app.get("/", (req, res) => res.redirect("/dashboard"));
app.use("*", (req,res) => {
  res.status(404);
  res.send("This is not a valid url.");
});

app.use(handleMongoError);
app.use(handleGenericError);

module.exports = app;
