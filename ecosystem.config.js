require("dotenv").config();

// Places .env variables prefixed with _PM2_ into production object
let productionObject = {};
for (var key in process.env){
  if (key.startsWith("_PM2_")){
    productionObject[key.substring(5, key.length)] = process.env[key];
  }
}

module.exports = {
  apps: [
    {
      name: "API",
      script: "./index.js",
      instances: 0,
      exec_mode: "cluster",
      watch: "../",
      env_dev: {
        NODE_ENV: "development",
        PORT: 3005,
        MAX_CACHE_SIZE_IN_MB: 10,
        MONGO_PASS: "sdf20bq-sJ_nudDBB",
        LOG_LEVEL: 'info',
      },
      env_prod: {
        ...productionObject
      }
    }
  ],
  deploy: {
    production: {
      user: "harrison",
      host: productionObject['HOST'],
      key: "~/.ssh/id_rsa2",
      ref: "origin/master",
      repo: "git@github.com:KingOfCramers/express-script-handler.git",
      path: "/home/harrison/API",
      "post-deploy":
        "yarn install && pm2 reload ecosystem.config.js --env prod && pm2 save"
    }
  }
};
