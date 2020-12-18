const { expect } = require('chai')
const supertest = require('supertest')
const { knex } = require('../../../db/config')
const app = require('../../../app')

describe('Search Routes', () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })

  it.only('should return a response of entries with that hashtag', async () => {
    const testQuery = 'Graduation'
    const response = await supertest(app)
      .get(`/api/search/entries?tag=${testQuery}`)
      .expect(200)

    const eachTagPicked = response.body.map((entry) =>
      entry.hashtags.find(
        (tag) => tag.tagname.toLowerCase() === testQuery.toLowerCase()
      )
    )

    expect(eachTagPicked.length).to.equal(response.body.length)
  })
})
