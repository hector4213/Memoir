const { Model } = require('../../db/config')
const tableNames = require('../../constants/tableNames')

class Format extends Model {
  static get tableName() {
    return tableNames.format
  }
}

module.exports = Format
