const { expect } = require('chai')
const supertest = require('supertest')
const { knex } = require('../../../db/config')
const app = require('../../../app')
const Entry = require('../../story/entry/entry.model')

describe('Test Route for /api/profile/*/manage', async () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })

  it('should fetch all entries that belong to users stories not written by user', async () => {
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' }) //returns the login response with user.token

    const { token, user } = login.body
    const response = await supertest(app)
      .get(`/api/profile/${user.id}/manage`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
  })
})
