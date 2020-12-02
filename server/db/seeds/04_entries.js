const entries = require('./seedData/entries')
const tableNames = require('../../constants/tableNames')
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.entry)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.entry).insert(entries)
    })
}
