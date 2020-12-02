const express = require('express')
const jwt = require('../../lib/jwt')
const Story = require('./story.model')
const User = require('../users/users.model')
const entries = require('./entry/entry.routes')
const yup = require('yup')

const router = express.Router({ mergeParams: true })

const schema = yup.object().shape({
  title: yup.string().trim().min(3).required(),
  date: yup.string().trim().min(6).required(),
})

// GET ALL USER STORIES

router.get('/', async (req, res, next) => {
  const allStories = await Story.query()
    .select('id', 'title', 'created')
    .withGraphFetched(
      '[user(userInfo), entries.[user(nameAndId),format(onlyType)]]'
    )
    .modifiers({
      userInfo(builder) {
        builder.select('id', 'username')
      },
      nameAndId(builder) {
        builder.select('id', 'username')
      },
      onlyType(builder) {
        builder.select('type')
      },
    })
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
  const { title, date } = req.body
  try {
    await schema.validate({ title, date })
    const decodedToken = await jwt.verify(req.token)
    if (!req.token || !decodedToken) {
      res.status(401).json({ error: 'missing token' })
    }
    const newStory = await Story.query().insert({
      title,
      date,
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
    .withGraphFetched('[entries.user(nameAndId), user(nameAndId)]')
    .modifiers({
      nameAndId(builder) {
        builder.select('id', 'username')
      },
    })
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

//EDIT Story title
router.put('/edit/:storyId', async (req, res, next) => {
  const { storyId } = req.params
  const { title, date } = req.body
  const decodedToken = await jwt.verify(req.token)
  const story = await Story.query().findById(storyId)
  const isVerified = decodedToken.id === story.author_id
  if (!story) return res.status(401).json({ error: 'Story does not exist' })
  try {
    if (isVerified) {
      await schema.validate({ title, date })
      const updateStory = await Story.query()
        .where({ id: storyId })
        .patch({ title, date })
      return res.status(200).json({ msg: 'Story  updated' })
    }
    return res.status(401).json({ error: 'unauthenticated' })
  } catch (error) {
    next(error)
  }
})

//DELETE story

router.delete('/:storyId', async (req, res, next) => {
  const { storyId } = req.params
  const story = await Story.query().findById(storyId)
  if (!story) return res.status(404).json({ error: 'Story does not exist' })
  console.log(story)
  const decodedToken = await jwt.verify(req.token)
  const isVerified = decodedToken.id === story.author_id

  try {
    if (isVerified) {
      await Story.query().deleteById(storyId)
      return res.status(200).json({ msg: 'Story deleted' })
    }
    return res.status(401).json({ msg: 'unauthenticated' })
  } catch (error) {
    next(error)
  }
})

router.use('/:storyId/entries', entries)

module.exports = router
