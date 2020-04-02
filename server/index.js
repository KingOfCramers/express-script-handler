require('module-alias/register'); // Require aliases from package.json file

const connect = require("@mongodb/connect");
const logger = require("@logger");
const app = require("./app");

connect()
  .then(db => {
    app.listen(process.env.PORT, () => {
      logger.info(`Running app in ${process.env.NODE_ENV} on port ${process.env.PORT}`);
    }) 
  })
  .catch(err => logger.info(`Could not connect to mongodb`, err) );
