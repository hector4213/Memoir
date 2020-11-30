const { Model } = require('../../db/config')
const tableNames = require('../../constants/tableNames')
const { entry } = require('../../constants/tableNames')

class Entry extends Model {
  static get tableName() {
    return tableNames.entry
  }
  static get relationMappings() {
    const Story = require('../story/story.model')
    const Format = require('../format/format.model')
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
        relation: Model.HasManyRelation,
        modelClass: Format,
        join: {
          from: 'entry.format_id',
          to: 'format.id',
        },
      },
    }
  }
  //do relation to story
}

module.exports = Entry
