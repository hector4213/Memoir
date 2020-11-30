const users = require('./seedData/users')
const tableNames = require('../../constants/tableNames')

exports.seed = function (knex, Promise) {
  return knex(tableNames.users)
    .del()
    .then(() => {
      return knex(tableNames.users).insert(users)
    })
}
