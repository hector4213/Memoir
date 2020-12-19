const { expect } = require('chai')
const supertest = require('supertest')
const { knex } = require('../../../db/config')
const Entry = require('../../story/entry/entry.model')
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

  it('should return a response of entries with that hashtag', async () => {
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

  it('should return a response with entries from that year', async () => {
    const queryYear = 1999
    const from = `${queryYear}-01-01`
    const to = `${queryYear}-12-31`
    const dbEntries = await Entry.query().whereBetween('date', [from, to])

    const response = await supertest(app)
      .get(`/api/search/entries/date?year=${queryYear}`)
      .expect(200)

    expect(response.body.length).to.equal(dbEntries.length)
  })

  it.only('should return  responses that matches with queried date', async () => {
    const queryYear = '1999'
    const queryMonth = '01'
    const queryDay = '18'
    const dbEntries = await Entry.query().where(
      'date',
      `${queryYear}-${queryMonth}-${queryDay}`
    )

    const response = await supertest(app)
      .get(
        `/api/search/entries/date?year=${queryYear}&month=${queryMonth}&day=${queryDay}`
      )
      .expect(200)

    expect(response.body.length).to.equal(dbEntries.length)
  })
})
