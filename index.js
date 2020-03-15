const express = require("express");
const bodyParser = require("body-parser");
const scripts = require("./routes/scripts");
const data = require("./routes/data");
const connect = require("./mongodb/connect");

require("./services/cache.js"); // Modify monogose exec function
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/scripts", scripts);
app.use("/data", data);

connect()
  .then(_ => {
    app.listen(process.env.PORT, () => {
      console.log(`Running app in ${process.env.NODE_ENV} on port ${process.env.PORT}`);
    }) 
  })
  .catch(err => {
    console.log(`Could not connect to mongodb`, err)
  });
