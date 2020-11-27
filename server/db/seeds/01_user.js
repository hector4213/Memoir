const users = require('./seedData/users')

exports.seed = function (knex, Promise) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert(users)
    })
}
