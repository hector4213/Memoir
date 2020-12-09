const tableNames = require('../../constants/tableNames')
exports.up = async (knex) => {
  await Promise.all([
    // story table
    knex.schema.createTable(tableNames.story, (table) => {
      table.increments().primary()
      table
        .integer('author_id')
        .references('id')
        .inTable(tableNames.users)
        .notNullable()
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.date('date', { useTz: false })
    }), //entry table
    knex.schema.createTable(tableNames.entry, (table) => {
      table.increments().primary()
      table
        .integer('story_id')
        .references('id')
        .inTable(tableNames.story)
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .references('id')
        .inTable(tableNames.users)
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('format_id')
        .references('id')
        .inTable(tableNames.format)
        .notNullable()
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.date('date').notNullable()
      table.string('embed')
    }), // format table
    knex.schema.createTable(tableNames.format, (table) => {
      table.increments().primary().notNullable()
      table.string('type').notNullable()
    }),
  ])
}

exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.entry,
      tableNames.format,
      tableNames.story,
      tableNames.users,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  )
}
