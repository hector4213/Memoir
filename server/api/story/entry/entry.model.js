const { Model } = require('../../../db/config')
const tableNames = require('../../../constants/tableNames')
const User = require('../../users/users.model')
const { entry } = require('../../../constants/tableNames')

class Entry extends Model {
  static get tableName() {
    return tableNames.entry
  }
  static get relationMappings() {
    const Story = require('../story.model')
    const Format = require('../../format/format.model')
    const User = require('../../users/users.model')
    const Status = require('../entry/status.model')
    return {
      story: {
        relation: Model.BelongsToOneRelation,
        modelClass: Story,
        join: {
          from: 'entry.story_id',
          to: 'story.id',
        },
      },
      format: {
        relation: Model.BelongsToOneRelation,
        modelClass: Format,
        join: {
          from: 'entry.format_id',
          to: 'format.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'entry.user_id',
          to: 'users.id',
        },
      },
      current: {
        relation: Model.BelongsToOneRelation,
        modelClass: Status,
        join: {
          from: 'entry.entry_status',
          to: 'entry_status.id',
        },
      },
    }
  }
}

module.exports = Entry
