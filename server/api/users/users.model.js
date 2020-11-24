const { Model } = require('objection')
const tableNames = require('../../constants/tableNames')

class User extends Model {
  static get tableName() {
    return tableNames.users
  }

  static get relationMappings() {
    const Message = require('./Message')
    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'users.id',
          to: 'messages.user_id',
        },
      },
    }
  }
}

module.exports = User
