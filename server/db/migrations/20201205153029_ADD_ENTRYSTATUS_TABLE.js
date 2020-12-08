const tableNames = require('../../constants/tableNames')
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.entryStatus, (table) => {
      table.increments()
      table.string('status')
    }),
  ])
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists(tableNames.entryStatus)
}
