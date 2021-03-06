const tableNames = require('../../constants/tableNames')

exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.users, (table) => {
      table.increments().primary()
      table.string('email').notNullable().unique()
      table.string('username').notNullable().unique()
      table.string('password', 500).notNullable()
    }),
  ])
}

exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.story,
      tableNames.users,
      tableNames.entry,
      tableNames.format,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  )
}
