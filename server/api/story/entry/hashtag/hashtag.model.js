const { Model } = require('../../../../db/config')
const tableNames = require('../../../../constants/tableNames')
const { entry } = require('../../../../constants/tableNames')

class Hashtag extends Model {
  static get tableName() {
    return tableNames.hashTags
  }

  static get relationMappings() {
    const Entry = require('../entry.model')
    return {
      entry: {
        relation: Model.ManyToManyRelation,
        modelClass: Entry,
        join: {
          from: 'hashtags.id',
          through: {
            from: 'hash_tag_relations.tag_id',
            to: 'hash_tag_relations.entry_id',
          },
          to: 'entry.id',
        },
      },
    }
  }
  static get modifiers() {
    return {
      onlyName(builder) {
        builder.select('tagname')
      },
    }
  }
}

module.exports = Hashtag
