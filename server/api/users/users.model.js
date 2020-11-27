const { Model } = require('../../db/config')
const tableNames = require('../../constants/tableNames')

class User extends Model {
  static get tableName() {
    return tableNames.users
  }

  static get relationMappings() {
    const Story = require('../story/story.model')
    return {
      story: {
        relation: Model.HasManyRelation,
        modelClass: Story,
        join: {
          from: 'users.id',
          to: 'story.id',
        },
      },
    }
  }
}

module.exports = User
