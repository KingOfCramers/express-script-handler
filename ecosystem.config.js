module.exports = {
  apps : [{
    name: 'API',
    script: './index.js',
    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    // args: 'one two',
    // instances: 1,
    // autorestart: true,
    // watch: false,
    // max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'harrison',
      host : '167.172.137.79',
      key : '~/.ssh/id_rsa',
      ref  : 'origin/master',
      repo : 'git@github.com:KingOfCramers/express-script-handler.git',
      path : '/home/harrison',
      'post-deploy' : 'yarn install && pm2 reload ecosystem.config.js --env production && pm2 save'
    }
  }
};
