exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments()
    table.string('username').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('user')
}
