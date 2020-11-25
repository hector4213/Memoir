const { Model } = require('../../db/config')
const tableNames = require('../../constants/tableNames')
const schema = require('./users.schema.json')

class User extends Model {
  static get tableName() {
    return tableNames.users
  }
}

module.exports = User
