const { expect } = require('chai')
const supertest = require('supertest')
const { knex } = require('../../../db/config')
const app = require('../../../app')
const Entry = require('../../story/entry/entry.model')
const Story = require('../../story/story.model')

describe('Test Route for /api/profile/*/manage', async () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })

  it.only("should fetch an array of entries that belong to user's stories not written by user", async () => {
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' }) //returns the login response with user.token

    const { token, user } = login.body
    const response = await supertest(app)
      .get(`/api/profile/${user.id}/manage`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const userStories = Story.query().select('id').where({ author_id: user.id })

    const allUserEntries = await Entry.query().whereIn('story_id', userStories) // All entries in user stories
    const onlyUserEntries = await Entry.query().where({ user_id: user.id })

    expect(response.body).to.be.a('array')
    expect(response.body.length).to.be.equal(
      allUserEntries.length - onlyUserEntries.length
    )
  })

  it('should change status from approved to denied', async () => {
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' })
    const { token, user } = login.body
    const userEntry = await Entry.query().where({ user_id: user.id }).first()

    const response = await supertest(app)
      .put(`/api/profile/${user.id}/manage/${userEntry.id}`)
      .set('Authorization', `bearer ${token}`)
      .send({ entry_status: 3 })
      .expect(200)

    const changedEntry = await Entry.query().where({ user_id: user.id }).first()
    expect(userEntry.entry_status).to.not.equal(changedEntry.entry_status)
  })
})
