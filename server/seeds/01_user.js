const users = require('./seedData/users')

exports.seed = function (knex, Promise) {
  return knex('user')
    .del()
    .then(() => {
      return knex('user').insert(users)
    })
}
