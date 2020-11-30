const formats = require('./seedData/formats')
const tableNames = require('../../constants/tableNames')
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.format)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.format).insert(formats)
    })
}
