const entryStatuses = require('./seedData/entryStatus')
const tableNames = require('../../constants/tableNames')
exports.seed = function (knex) {
  // Deletes ALL existing entries

  return knex(tableNames.entryStatus)
    .del()
    .then(() => {
      return knex(tableNames.entryStatus).insert(entryStatuses)
    })
}
