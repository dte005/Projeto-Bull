const dotEnv = require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DEV_BULL_USERNAME,
    "password": process.env.DEV_BULL_PASSWORD,
    "database": process.env.DEV_BULL_DATABASE,
    "host": "localhost",
    "dialect": "mysql",
    "operatorsAliases": 0,
    "timezone": "-03:00"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database",
    "host": "localhost",
    "dialect": "mysql",
    "operatorsAliases": 0,
    "timezone": "-03:00"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": 0,
    "timezone": "-03:00"
  }
}
