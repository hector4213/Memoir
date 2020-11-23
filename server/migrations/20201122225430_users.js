exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.text('username')
    table.text('email')
    table.string('password')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
