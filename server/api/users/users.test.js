const { expect } = require('chai')
const supertest = require('supertest')
const { knex } = require('../../db/config')
const app = require('../../app')

describe('GET /api/users', () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })
  it('should respond with a array of users', async () => {
    const response = await supertest(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.length).to.be.gt(0)
  })
})
