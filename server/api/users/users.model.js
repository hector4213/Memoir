const { Model } = require('../../db/config')
const tableNames = require('../../constants/tableNames')

class User extends Model {
  static get tableName() {
    return tableNames.users
  }

  static get relationMappings() {
    const Story = require('../story/story.model')
    return {
      stories: {
        relation: Model.HasManyRelation,
        modelClass: Story,
        join: {
          from: 'users.id',
          to: 'story.author_id',
        },
      },
    }
  }
}

module.exports = User
