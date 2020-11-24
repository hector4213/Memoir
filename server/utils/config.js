require('dotenv').config()

const { POSTGRES_KEY, JWT_SECRET, PG_USER } = process.env

module.exports = {
  PG_KEY,
  PG_USER,
  PG_PW,
  PG_HOST,
  PG_DB,
  JWT_SECRET,
}
