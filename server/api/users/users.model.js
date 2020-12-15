const { Model } = require('../../db/config')
const tableNames = require('../../constants/tableNames')

class User extends Model {
  static get tableName() {
    return tableNames.users
  }

  static get relationMappings() {
    const Story = require('../story/story.model')
    const Entry = require('../story/entry/entry.model')
    const StoryLikes = require('../story/storylikes.model')
    return {
      stories: {
        relation: Model.HasManyRelation,
        modelClass: Story,
        join: {
          from: 'users.id',
          to: 'story.author_id',
        },
      },
      userEntries: {
        relation: Model.HasManyRelation,
        modelClass: Entry,
        join: {
          from: 'users.id',
          to: 'entry.user_id',
        },
      },
      inspires: {
        relation: Model.ManyToManyRelation,
        modelClass: Story,
        join: {
          from: 'users.id',
          through: {
            from: 'inspires.user_id',
            to: 'inspires.story_id',
            extra: ['inspiring'],
          },
          to: 'story.id',
        },
      },
    }
  }
  static get modifiers() {
    return {
      nameAndId(builder) {
        builder.select('id', 'username')
      },
    }
  }
}

module.exports = User
