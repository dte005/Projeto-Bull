import 'dotenv/config';

module.exports = {
  "development": {
    "username": process.env.DEV_BULL_USERNAME,
    "password": process.env.DEV_BULL_PASSWORD,
    "database": process.env.DEV_BULL_DATABASE,
    "host": process.env.DEV_BULL_HOST,
    "dialect": "mysql",
    "operatorsAliases": 0,
    "timezone": "-03:00"
  },
  "production": {
    "username": process.env.DEV_BULL_USERNAME,
    "password": process.env.DEV_BULL_PASSWORD,
    "database": process.env.DEV_BULL_DATABASE,
    "host": process.env.DEV_BULL_HOST,
    "dialect": "mysql",
    "operatorsAliases": 0,
    "timezone": "-03:00"
  },
}
