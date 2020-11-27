const { Model } = require('../../db/config')
const tableNames = require('../../constants/tableNames')

class Story extends Model {
  static get tableNames() {
    return tableNames.story
  }

  static get relationMappings() {
    const User = require('../users/users.model')
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'story.id',
          to: 'users.id',
        },
      },
    }
  }
}
