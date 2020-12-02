const { expect } = require('chai')
const supertest = require('supertest')
const { knex } = require('../../db/config')
const app = require('../../app')

describe('POST /story/create', () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })

  it('User can successfull create a new story', async () => {
    const response = await supertest(app)
      .get('/api/story/create')
      .expect('Content-type', /json/)
      .expect(201)

    expect(response.body).to.not.be.undefined()
  })
})
