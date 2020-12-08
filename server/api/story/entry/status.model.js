const { Model } = require('../../../db/config')
const tableNames = require('../../../constants/tableNames')

class Status extends Model {
  static get tableName() {
    return tableNames.entryStatus
  }

  static get relationMappings() {
    const Entry = require('../../format/story/entry/entry.model')
    return {
      entry: {
        relation: Model.HasManyRelation,
        modelClass: Entry,
        join: { from: 'entry_status.id', to: 'entry.entry_status' },
      },
    }
  }
}

module.exports = Status
