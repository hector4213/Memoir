const { expect } = require('chai')
const supertest = require('supertest')
const { knex } = require('../../db/config')
const app = require('../../app')
const Story = require('./story.model')

describe('CRUD /story', () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })

  it('User can successfull create a new story', async () => {
    const dbStoriesAtStart = await Story.query()

    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' })

    const testStory = {
      name: 'Micheal Jordan',
      occupation: 'baller',
      story_img: 'https://i.imgur.com/YLyEJB7.jpeg',
    }
    const { token } = login.body

    const response = await supertest(app)
      .post('/api/stories/create')
      .set('Authorization', `bearer ${token}`)
      .send(testStory)
      .expect('Content-type', /json/)
      .expect(201)

    const dbStoriesAtEnd = await Story.query()
    expect(dbStoriesAtEnd.length).to.equal(dbStoriesAtStart.length + 1)
    expect(response.body.msg).to.equal(`Story for ${testStory.name} created!`)
  })

  it('can fetch ONE story', async () => {
    const testId = 2
    const response = await supertest(app)
      .get(`/api/stories/${testId}`)
      .expect('Content-Type', /json/)
      .expect(200)
    const { id } = response.body
    expect(id).to.equal(testId)
  })

  it('deletes their own story', async () => {
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' })

    const storyId = 16
    const { token } = login.body
    const response = supertest(app)
      .delete(`/api/stories/${storyId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect()
  })
})
