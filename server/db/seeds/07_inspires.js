const tableNames = require('../../constants/tableNames')
const inspires = require('./seedData/inspires')
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.inspires)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.inspires).insert(inspires)
    })
}
