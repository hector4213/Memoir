// Update with your config settings.
const config = require('./utils/config')

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: config.PG_HOST || 'localhost',
      user: config.PG_USER,
      password: config.PG_KEY,
      database: config.PG_DB,
    },
  },
}
