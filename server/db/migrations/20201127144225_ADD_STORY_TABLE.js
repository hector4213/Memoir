const tableNames = require('../../constants/tableNames')
exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.story, (table) => {
    table.increments().primary()
    table
      .integer('author_id')
      .references('id')
      .inTable(tableNames.users)
      .notNullable()
    table.string('title').notNullable()
    table.datetime('created').defaultTo(knex.fn.now())
  })
}

exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.users,
      tableNames.story,
      tableNames.entry,
      tableNames.format,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  )
}
