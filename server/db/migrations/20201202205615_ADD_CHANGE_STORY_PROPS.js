const tableNames = require('../../constants/tableNames')

exports.up = async (knex) => {
  await Promise.all([
    knex.schema.table(tableNames.story, (table) => {
      table.dropColumn('date')
      table.dropColumn('title')
      table.string('name', 128).notNullable()
      table.string('occupation').notNullable()
      table.string('story_img')
    }),
  ])
}

exports.down = async (knex) => {
  await Promise.all([
    knex.schema.table(tableNames.story, (table) => {
      table.dropColumn('name')
      table.dropColumn('occupation')
      table.dropColumn('story_img')
    }),
  ])
}
