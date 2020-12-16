const tableNames = require('../../constants/tableNames')
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.inspires, (table) => {
      table.increments()
      table
        .integer('user_id')
        .references('id')
        .inTable(tableNames.users)
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('story_id')
        .references('id')
        .inTable(tableNames.story)
        .notNullable()
        .onDelete('CASCADE')
      table.bool('inspiring')
    }),
  ])
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.inspires)
}
