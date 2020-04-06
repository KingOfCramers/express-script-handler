const path = require("path");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
// Loggers
const { morganConsoleErr, morganConsoleRes, morganToWinston } = require("./loggers/morgan");
// Middleware
const isFromServer = require("./middleware/isFromServer");
const { handleMongoError, handleGenericError } = require("./middleware/errors");
// Routes
const services = require("./routes/services");
const committees = require("./routes/committees");
const disclosures = require("./routes/disclosures");
const statements = require("./routes/statements");
const meta = require("./routes/meta");
const publicPath = path.join(__dirname, "..",  "client", "dist");

require("./services/cache.js"); // Modify monogose exec function
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Colorize morgan status-codes and print to console, write all requests  with winston's stream. 
app.use(morganConsoleErr);
app.use(morganConsoleRes);
app.use(morganToWinston);

app.use("/services", isFromServer, services); // Add authentication!
app.use("/data/committees", committees);
app.use("/data/disclosures", disclosures);
app.use("/data/statements", statements);
app.use("/data/meta", meta);
app.use("/", express.static(publicPath));

/* GET React App */
//app.use(['/app', '/app/*'], express.static(publicPath))
//app.get("/", (req, res) => res.redirect("/app"));

app.use("*", (req,res) => {
  res.status(404);
  res.send("This is not a valid url.");
});

app.use(handleMongoError);
app.use(handleGenericError);

module.exports = app;
