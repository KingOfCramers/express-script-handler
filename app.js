const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
//const authentication = require("./middleware/authentication");
const { errLogger, resLogger } = require("./loggers/morgan");
const committees = require("./routes/committees");
const disclosures = require("./routes/disclosures");
const statements = require("./routes/statements");

require("./services/cache.js"); // Modify monogose exec function
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errLogger);
app.use(resLogger);
app.use("/data/committees", committees);
app.use("/data/disclosures", disclosures);
app.use("/data/statements", statements);

const publicPath = path.join(__dirname, "frontend", "dist");
app.use("/dashboard", express.static(publicPath));
app.get("/", (req, res) => res.redirect("/dashboard"));

app.use("*", (req,res) => {
  res.status(404);
  res.send("This is not a valid url.");
});

module.exports = app;
