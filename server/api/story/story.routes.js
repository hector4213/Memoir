const express = require('express')
const jwt = require('../../lib/jwt')
const Story = require('./story.model')
const entries = require('./entry/entry.routes')
const yup = require('yup')

const router = express.Router({ mergeParams: true })

const schema = yup.object().shape({
  name: yup.string().trim().min(3).required(),
  occupation: yup.string().trim().min(2).required(),
  story_img: yup.string().trim().min(4).required(),
})

// GET ALL USER STORIES

router.get('/', async (req, res, next) => {
  const allStories = await Story.query()
    .select('id', 'name', 'occupation', 'story_img')
    .withGraphFetched('user(userInfo)')
    .modifiers({
      userInfo(builder) {
        builder.select('id', 'username')
      },
    })
  try {
    if (allStories.length) {
      return res.status(200).json(allStories)
    }
    return res.status(404).json({ error: 'No stories found' })
  } catch (error) {
    next(error)
  }
})

//Create a new story
router.post('/create', async (req, res, next) => {
  const { name, occupation, story_img } = req.body
  try {
    await schema.validate({ name, occupation, story_img })
    const decodedToken = await jwt.verify(req.token)
    if (!req.token || !decodedToken) {
      res.status(401).json({ error: 'missing token' })
    }
    const newStory = await Story.query().insert({
      name,
      occupation,
      story_img,
      author_id: decodedToken.id,
    })
    res.status(201).json({ msg: `Story for ${name} created!` })
  } catch (error) {
    next(error)
  }
})

//GET ONE STORY

router.get('/:storyId', async (req, res, next) => {
  const { storyId } = req.params
  const story = await Story.query()
    .select('id', 'name', 'occupation', 'story_img')
    .withGraphFetched(
      '[user(nameAndId), entries.[user(nameAndId),hashtags(onlyName)], inspiredBy]'
    )
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

//EDIT Story
router.put('/edit/:storyId', async (req, res, next) => {
  const { storyId } = req.params
  const { name, occupation, story_img } = req.body
  const decodedToken = await jwt.verify(req.token)
  const story = await Story.query().findById(storyId)
  const isVerified = decodedToken.id === story.author_id
  if (!story) return res.status(401).json({ error: 'Story does not exist' })
  try {
    if (isVerified) {
      await schema.validate({ name, occupation, story_img })
      const updateStory = await Story.query()
        .where({ id: storyId })
        .patch({ name, occupation, story_img })
      return res.status(201).json({ msg: `Story for ${name} updated` })
    }
    return res.status(401).json({ error: 'unauthenticated' })
  } catch (error) {
    next(error)
  }
})

//DELETE story

router.delete('/:storyId', async (req, res, next) => {
  const { storyId } = req.params

  try {
    const decodedToken = await jwt.verify(req.token)
    const story = await Story.query().findById(storyId)
    if (!story) return res.status(404).json({ error: 'Story does not exist' })

    const isVerified = decodedToken.id === story.author_id

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
