const tableNames = require('../../constants/tableNames')

exports.up = async (knex) => {
  await Promise.all([
    knex.schema.table(tableNames.entry, (table) => {
      table.dropColumn('embed')
    }),
    knex.schema.table(tableNames.entry, (table) => {
      table.text('embed')
    }),
  ])
}

exports.down = async (knex) => {
  return knex.schema.table(tableNames.entry, (table) => {
    table.dropColumn('embed')
  })
}
