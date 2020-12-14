const { Model } = require('../../db/config')
const tableNames = require('../../constants/tableNames')
const { story } = require('../../constants/tableNames')

class Story extends Model {
  static get tableName() {
    return tableNames.story
  }

  static get relationMappings() {
    const Entry = require('./entry/entry.model')
    const User = require('../users/users.model')
    return {
      entries: {
        relation: Model.HasManyRelation,
        modelClass: Entry,
        join: {
          from: 'story.id',
          to: 'entry.story_id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'story.author_id',
          to: 'users.id',
        },
      },
      inspiredBy: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'story.id',
          through: {
            from: 'inspires.story_id',
            to: 'inspires.user_id',
            extra: ['inspiring'],
          },
          to: 'users.id',
        },
      },
    }
  }
}

module.exports = Story
