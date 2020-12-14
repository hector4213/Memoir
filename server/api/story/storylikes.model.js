const { Model } = require('../../db/config')
const tableNames = require('../../constants/tableNames')

class StoryLikes extends Model {
  static get tableName() {
    return tableNames.inspires
  }
}

module.exports = StoryLikes
