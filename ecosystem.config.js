module.exports = {
  apps: [
    {
      name: "API",
      script: "./index.js",
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      // args: 'one two',
      // instances: 1,
      // autorestart: true,
      // watch: false,
      // max_memory_restart: '1G',
      watch: "../",
      env_dev: {
        NODE_ENV: "development",
        PORT: 3005,
        MAX_CACHE_SIZE_IN_MB: 10,
        MONGO_PASS: "sdf20bq-sJ_nudDBB",
        LOG_LEVEL: 'info',
      },
      env_prod: {
        NODE_ENV: "production",
        PORT: 3005
      }
    }
  ],

  deploy: {
    production: {
      user: "harrison",
      host: "167.172.137.79",
      key: "~/.ssh/id_rsa2",
      ref: "origin/master",
      repo: "git@github.com:KingOfCramers/express-script-handler.git",
      path: "/home/harrison/API",
      "post-deploy":
        "yarn install && pm2 reload ecosystem.config.js --env prod && pm2 save"
    }
  }
};
