const { expect } = require('chai')
const supertest = require('supertest')
const { knex } = require('../../../db/config')
const app = require('../../../app')
const Entry = require('./entry.model')
const entries = require('../../../db/seeds/seedData/entries')

describe('Routes for /api/stories/*/entries', () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.seed.run()
  })

  afterEach(async () => {
    await knex.migrate.rollback()
  })

  it('Can fetch one entry by id and its storyid', async () => {
    const targetEntry = await Entry.query().findById(15)
    const response = await supertest(app)
      .get(`/api/stories/1/entries/${targetEntry.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).to.be.a('object')
    expect(response.body.id).to.equal(targetEntry.id)
  })

  it('Can update an entry they  provided token from their story', async () => {
    const targetEntry = await Entry.query().findById(21)
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' }) //returns the login response with user.token
    const { token } = login.body
    const updatedEntry = {
      title: 'My upated entry',
      description: 'i was updated',
      date: 'August 30, 2020',
      embed: 'https://i.imgur.com/P6fyhbB.png',
      format_id: 1,
    }
    const response = await supertest(app)
      .put(`/api/stories/1/entries/edit/${targetEntry.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedEntry)
      .expect('Content-Type', /json/)
      .expect(200)

    const fetchedEntry = await Entry.query().findById(targetEntry.id)
    expect(targetEntry).to.not.equal(updatedEntry)
    expect(updatedEntry.title).to.equal(fetchedEntry.title)
    expect(updatedEntry.description).to.equal(fetchedEntry.description)
    expect(updatedEntry.embed).to.equal(fetchedEntry.embed)
    expect(updatedEntry.format_id).to.equal(fetchedEntry.format_id)
  })

  it('User can delete an entry in their story where user is not author', async () => {
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' })
    const { token } = login.body
    const initialEntries = await Entry.query().where({ story_id: 1 })
    const response = await supertest(app)
      .delete(`/api/stories/1/entries/15`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)

    const entriesAtEnd = await Entry.query().where({ story_id: 1 })
    expect(entriesAtEnd.length).to.equal(initialEntries.length - 1)
  })

  it.only('should be able to edit a users hashtags', async () => {
    const login = await supertest(app)
      .post('/api/auth/login')
      .send({ email: 'tester@test.com', password: 'React!123' })

    const initialEntry = await Entry.query()
      .withGraphFetched('hashtags')
      .findById(21)
    // this is a seeded entry
    const updatedEntry = {
      title: 'Updating an entry',
      description: 'Lets see if this updates',
      date: '2020-04-28',
      embed: '',
      hashtags: [
        { tagname: 'this' },
        { tagname: 'is' },
        { tagname: 'testing' },
        { tagname: 'put' },
      ],
      format_id: 3,
    }

    const { token, user } = login.body

    const response = await supertest(app)
      .put(`/api/stories/1/entries/edit/${initialEntry.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedEntry)
      .expect('Content-Type', /json/)
      .expect(200)

    const afterUpdate = await Entry.query()
      .withGraphFetched('hashtags(onlyName)')
      .findById(initialEntry.id)

    expect(initialEntry.id).to.equal(afterUpdate.id)
    expect(initialEntry.title).to.not.equal(afterUpdate.title)
    expect(initialEntry.description).to.not.equal(afterUpdate.description)
    expect(initialEntry.hashtags).to.not.equal(afterUpdate.hashtags)
    expect(afterUpdate.hashtags).to.be.a('array')
    console.log(afterUpdate)
  })
})
