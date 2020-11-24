const users = require('./users')

exports.seed = (knex) => {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert(users)
    })
}
