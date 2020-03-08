var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

routes(app);

var server = app.listen(process.env.PORT, () => {
	console.log(`App running on port ${process.env.PORT}`, server.address().port);
}); 
