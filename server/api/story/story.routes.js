const express = require('express')
const jwt = require('../../lib/jwt')
const Story = require('./story.model')
const User = require('../users/users.model')
const entries = require('../entry/entry.routes')
const yup = require('yup')

const router = express.Router({ mergeParams: true })

const schema = yup.object().shape({
  title: yup.string().trim().min(3).required(),
})

// GET ALL USER STORIES

router.get('/', async (req, res, next) => {
  try {
    const allStories = await Story.query()
      .withGraphFetched('user(userInfo)')
      .modifiers({
        userInfo(builder) {
          builder.select('id', 'username')
        },
      })
      .withGraphFetched('entries')
    res.status(200).json(allStories)
  } catch (error) {
    next(error)
  }
})

//GET ONE STORY

router.get('/:storyId', async (req, res, next) => {
  const { storyId } = req.params
  // need token?
  try {
    const story = await Story.query()
      .withGraphFetched('user(userInfo)')
      .modifiers({
        userInfo(builder) {
          builder.select('id', 'username')
        },
      })
      .withGraphFetched('entries')
      .findById(storyId)

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
    if (!req.token || !decodedToken) {
      res.status(401).json({ error: 'missing token' })
    }
    console.log(decodedToken)
    const newStory = await Story.query().insert({
      title,
      author_id: decodedToken.id,
    })
    res.status(201).json({ msg: `${title} created!` })
  } catch (error) {
    next(error)
  }
})

router.use('/:storyId/entries', entries)

module.exports = router
