const tableNames = require('../../constants/tableNames')
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.table(tableNames.entry, (table) => {
      table
        .integer('entry_status')
        .references('id')
        .inTable(tableNames.entryStatus)
        .notNullable()
        .onDelete('CASCADE')
    }),
  ])
}

exports.down = async (knex) => {
  await knex.schema.table(tableNames.entry, (table) => {
    table.dropColumn('entry_status')
  })
}
