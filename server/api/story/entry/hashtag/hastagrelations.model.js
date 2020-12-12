const { Model } = require('../../../../db/config')
const tableNames = require('../../../../constants/tableNames')

class HashTagRelations extends Model {
  static get tableName() {
    return tableNames.hashTagsRelations
  }
}

module.exports = HashTagRelations
