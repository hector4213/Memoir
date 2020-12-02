const stories = require('./seedData/stories')
const tableNames = require('../../constants/tableNames')
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.story)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.story).insert(stories)
    })
}
