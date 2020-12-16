const { expect } = require('chai')
const supertest = require('supertest')
const { knex } = require('../../db/config')
const app = require('../../app')
const Story = require('./story.model')
const Inspires = require('./storylikes.model')

describe('CRUD /story', () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })

  it('can successfully create a new story', async () => {
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

  it('can fetch ONE story by id', async () => {
    const testId = 2
    const response = await supertest(app)
      .get(`/api/stories/${testId}`)
      .expect('Content-Type', /json/)
      .expect(200)
    const { id } = response.body
    expect(id).to.equal(testId)
  })

  it('can update all fields for the story by id auth with jwt token', async () => {
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' })
    const { token } = login.body
    const storyId = 18
    const updatedStory = {
      name: 'Fake Userington',
      occupation: 'Updater',
      story_img: 'https://i.imgur.com/gVXqYHR.jpg',
    }

    const response = await supertest(app)
      .put(`/api/stories/edit/${storyId}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedStory)
      .expect(201)

    const fetchedStory = await Story.query().where({ id: storyId })
    expect(fetchedStory[0].name).to.be.equal(updatedStory.name)
    expect(fetchedStory[0].occupation).to.be.equal(updatedStory.occupation)
    expect(fetchedStory[0].story_img).to.be.equal(updatedStory.story_img)
    expect(fetchedStory[0].author_id).to.be.equal(login.body.user.id)
  })

  it('can be deleted by story id as a parameter and sending their jwt token', async () => {
    const dbStoriesAtStart = await Story.query()
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' })

    const storyId = 2
    const { token } = login.body
    const response = await supertest(app)
      .delete(`/api/stories/${storyId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const dbStoriesAtEnd = await Story.query()
    expect(dbStoriesAtEnd.length).to.equal(dbStoriesAtStart.length - 1)
  })

  it.only('logged in user is able to be inspired(like) by a story', async () => {
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' })
    const { token, user } = login.body
    const noInspires = await Inspires.query()
      .where({ user_id: user.id })
      .andWhere({ story_id: 6 })
      .first()
    console.log(noInspires)
    const response = await supertest(app)
      .post('/api/stories/6/inspire')
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const nowInspired = await Inspires.query()
      .where({ user_id: user.id })
      .andWhere({ story_id: 6 })
      .first()

    expect(noInspires).to.not.equal(nowInspired)
  })
})
