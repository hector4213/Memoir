const { hashTagsRelations } = require('../../constants/tableNames')
const tableNames = require('../../constants/tableNames')
const hashTagRelations = require('./seedData/hashtagrelations')
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableNames.hashTagsRelations)
    .del()
    .then(function () {
      // Inserts seed entries
      return knex(tableNames.hashTagsRelations).insert(hashTagRelations)
    })
}
