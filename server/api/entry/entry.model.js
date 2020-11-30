const { Model } = require('../../db/config')
const tableNames = require('../../constants/tableNames')

class Entry extends Model {
  static get tableName() {
    return tableNames.entry
  }

  //do relation to story
}

module.exports = Entry
