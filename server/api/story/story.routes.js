const express = require('express')
const jwt = require('../../lib/jwt')
const Story = require('./story.model')
const User = require('../users/users.model')
const entries = require('./entry/entry.routes')
const yup = require('yup')

const router = express.Router({ mergeParams: true })

const schema = yup.object().shape({
  title: yup.string().trim().min(3).required(),
})

// GET ALL USER STORIES

router.get('/', async (req, res, next) => {
  const allStories = await Story.query()
    .withGraphFetched('user(userInfo)')
    .modifiers({
      userInfo(builder) {
        builder.select('id', 'username')
      },
    })
    .withGraphFetched('entries')
  try {
    if (allStories) {
      return res.status(200).json(allStories)
    }
    return res.status(404).json({ error: 'No stories found' })
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
    const newStory = await Story.query().insert({
      title,
      author_id: decodedToken.id,
    })
    res.status(201).json({ msg: `${title} created!` })
  } catch (error) {
    next(error)
  }
})

//GET ONE STORY

router.get('/:storyId', async (req, res, next) => {
  const { storyId } = req.params
  const story = await Story.query()
    .withGraphFetched('user(userInfo)')
    .modifiers({
      userInfo(builder) {
        builder.select('id', 'username')
      },
    })
    .withGraphFetched('entries')
    .findById(storyId)
  try {
    if (!story) {
      return res.status(404).json({ error: 'Story not found' })
    }
    res.status(200).json(story)
  } catch (error) {
    next(error)
  }
})

//EDIT Story
router.put('/edit/:storyId', async (req, res, next) => {
  const { storyId } = req.params
  const { title } = req.body
  const decodedToken = await jwt.verify(req.token)
  const story = await Story.query().findById(storyId)
  const isVerified = decodedToken.id === story.author_id
  if (!story) return res.status(401).json({ error: 'Story does not exist' })
  try {
    if (isVerified) {
      const updateStory = await Story.query()
        .where({ id: storyId })
        .patch({ title })
      return res.status(200).json({ msg: 'Story title updated' })
    }
    return res.status(401).json({ error: 'unauthenticated' })
  } catch (error) {
    next(error)
  }
})

//DELETE story

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const story = await Story.query().findById(id)
  const decodedToken = await jwt.verify(req.token)
  const isVerified = decodedToken.id === story.author_id
  if (!story) return res.status(404).json({ error: 'Story does not exist' })
  try {
    if (isVerified) {
      await Story.query().del().where({ id })
      return res.status(200).json({ msg: 'Story deleted' })
    }
    return res.status(401).json({ msg: 'unauthenticated' })
  } catch (error) {
    next(error)
  }
})

router.use('/:storyId/entries', entries)

module.exports = router
