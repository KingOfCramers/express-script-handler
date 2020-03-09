var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/basic", routes);

var server = app.listen(process.env.PORT, () => {
  console.log(`Running app in ${process.env.NODE_ENV} on ${server.address().port}`);
})
