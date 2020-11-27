process.env.NODE_ENV = 'test'
const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../app')
const { knex } = require('../../db/config')
const User = require('../users/users.model')

describe('POST for /auth', () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })

  it('Creates a new user /signup', async () => {
    const newUser = {
      username: 'testy',
      email: 'testy@testy.com',
      password: 'Hello!123',
    }
    const response = await supertest(app).post('/api/auth/signup').send(newUser)
    expect(response.status).to.eql(201)
    expect(response.body).to.include.keys('user', 'token')
  })

  it('test if user can log in /login', async () => {
    const userLogin = {
      username: 'testthedb',
      password: 'React!123',
    }
    const response = await supertest(
      app.post('/api/auth/login').send(userLogin)
    )
    expect(response.status).to.eql(200)
  })
})
