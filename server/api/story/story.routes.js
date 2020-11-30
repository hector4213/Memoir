const express = require('express')
const jwt = require('../../lib/jwt')
const Story = require('./story.model')
const User = require('../users/users.model')
const yup = require('yup')

const router = express.Router()

const schema = yup.object().shape({
  title: yup.string().trim().min(3).required(),
})

// GET ALL USER STORIES

router.get('/', async (req, res, next) => {
  try {
    const allStories = await Story.query()
      .withGraphFetched('entries')
      .withGraphFetched('user(userInfo)')
      .modifiers({
        userInfo(builder) {
          builder.select('id', 'username')
        },
      })
    res.status(200).json(allStories)
  } catch (error) {
    next(error)
  }
})

//GET ONE STORY

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  // need token?
  try {
    const story = await Story.query()
      .withGraphFetched('entries')
      .withGraphFetched('user(userInfo)')
      .modifiers({
        userInfo(builder) {
          builder.select('id', 'username')
        },
      })
      .findById(id)

    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
})

//Create a new story

router.post('/create', async (req, res, next) => {
  const { title } = req.body
  try {
    await schema.validate({ title })
    const decodedToken = await jwt.verify(req.token)
    if (!req.token) {
      const error = new Error('token missing or invalid')
      res.status(401)
      throw error
    }
    const newStory = await Story.query().insert({
      title,
      author_id: decodedToken.id,
    })
    res.status(201).json({ msg: `${title} created!` })
  } catch (error) {
    next(error)
  }
})

router.put('/edit', async () => {})

module.exports = router
