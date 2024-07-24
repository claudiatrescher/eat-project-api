module.exports = {
  apps : [{
    name   : "meat-api",
    script : "./dist/main.js",
    intances: 0,
    exec_mode: "cluster",
    watch: true,
    merge_logs: true,
    env: {
      SERVER_MODE:  5000,
      DB_URL: 'mongodb://localhost/meat-api',
      NODE_ENV: "development"
    },
    env_production: {
      SERVER_MODE:  5001,
      NODE_ENV: "production"



    }
  }]
}
