const tableNames = require('../../constants/tableNames')

exports.up = async (knex) => {
  await Promise.all([
    knex.schema.table(tableNames.story, (table) => {
      table.dropColumn('embed')
      table.text('embed')
    }),
  ])
}

exports.down = async (knex) => {
  await knex.schema.table(tableNames.story, (table) => {
    table.dropColumn('embed')
  })
}
