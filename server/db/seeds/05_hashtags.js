const tableNames = require('../../constants/tableNames')
const hashTags = require('./seedData/hashtags')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.hashTags)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.hashTags).insert(hashTags)
    })
}
