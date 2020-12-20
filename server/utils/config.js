require('dotenv').config()

const {
  PG_KEY,
  JWT_SECRET,
  PG_USER,
  PG_DB,
  PG_HOST,
  TEST_DB,
  PG_PORT,
  PRODUCTION_CONNECTION_STR,
} = process.env

module.exports = {
  PG_KEY,
  PG_USER,
  PG_HOST,
  PG_DB,
  JWT_SECRET,
  TEST_DB,
  PG_PORT,
  PRODUCTION_CONNECTION_STR,
}
