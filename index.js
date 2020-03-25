const connect = require("./dbs/mongodb/connect");
const logger = require("./loggers/winston");
const app = require("./app");

connect()
  .then(_ => {
    app.listen(process.env.PORT, () => {
      logger.info(`Running app in ${process.env.NODE_ENV} on port ${process.env.PORT}`);
    }) 
  })
  .catch(err => logger.info(`Could not connect to mongodb`, err) );
