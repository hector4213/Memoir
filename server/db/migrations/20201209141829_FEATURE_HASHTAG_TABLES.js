const tableNames = require('../../constants/tableNames')

exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.hashTags, (table) => {
      table.increments()
      table.string('tagname')
    }),
    knex.schema.createTable(tableNames.hashTagsRelations, (table) => {
      table.increments()
      table.integer('entry_id').references('id').inTable(tableNames.entry)
      table.integer('tag_id').references('id').inTable(tableNames.hashTags)
    }),
  ])
}

exports.down = async (knex) => {
  await Promise.all(
    [tableNames.hashTagsRelations, tableNames.hashTags].map((tableName) => {
      return knex.schema.dropTableIfExists(tableName)
    })
  )
}
