const { expect } = require('chai')
const supertest = require('supertest')
const { knex } = require('../../db/config')
const User = require('./users.model')
const app = require('../../app')

describe('GET profile /api/users', () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })

  it('should have only username and id in response if no token provided', async () => {
    const response = await supertest(app)
      .get('/api/profile/12') //This user is in seed data
      .expect(200)
    expect(response.body).to.be.a('object')
    expect(response.body).to.have.all.keys(['id', 'username'])
  })

  it('should return userdata, an array of users entries, an array of users stories if JWT provided', async () => {
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' })

    const { token, user } = login.body

    const response = await supertest(app)
      .get(`/api/profile/${user.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const { id, username, email, stories, userEntries } = response.body
    expect(response.body).to.have.all.keys([
      'id',
      'username',
      'email',
      'stories',
      'userEntries',
    ])
    expect(stories).to.be.a('array')
    expect(userEntries).to.be.a('array')
  })

  it('should delete a users account with a status response of 204 No content ', async () => {
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' })
    const { token, user } = login.body

    const allUsers = await User.query().select('id', 'username')

    const response = await supertest(app)
      .delete(`/api/profile/${user.id}/`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const afterDelete = await User.query().select('id', 'username')
    expect(afterDelete.length).to.equal(allUsers.length - 1)
  })
})
