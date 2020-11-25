const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../../app')

describe('GET /api/users', () => {
  it('should respond with a array of users', async () => {
    const response = await supertest(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.length).to.be.gt(0)
  })
})
