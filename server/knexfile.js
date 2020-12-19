// Update with your config settings.
const config = require('./utils/config')

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: config.PG_HOST,
      user: config.PG_USER,
      password: config.PG_KEY,
      database: config.PG_DB,
      port: config.PG_PORT,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: config.PG_HOST,
      user: config.PG_USER,
      password: config.PG_KEY,
      database: config.TEST_DB,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: config.PRODUCTION_CONNECTION_STR,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
}
