const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../app')

describe('POST for /auth/signup', () => {
  it('Creates a new user', () => {
    const response = supertest(app)
      .post('/api/auth/signup')
      .send({ username: 'testy', email: 'testy@test.com' })
      .expect(201)
  })
})
