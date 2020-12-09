const { Model } = require('../../../../db/config')
const tableNames = require('../../../../constants/tableNames')

class Hashtag extends Model {
  static get tableName() {
    return tableNames.hashTags
  }

  static get relationMappings() {
    const Entry = require('../entry.model')
  }
}

module.exports = Hashtag
