const tableNames = require('../../constants/tableNames')

exports.up = async (knex) => {
  await Promise.all[
    knex.schema.table(tableNames.entry, (table) => {
      table.dropColumn('date')
      table.string('date').notNullable()
    })
  ]
}

exports.down = async (knex) => {
  await Promise.all([
    knex.schema.table(tableNames.entry, (table) => {
      table.dropColumn('date')
    }),
  ])
}
