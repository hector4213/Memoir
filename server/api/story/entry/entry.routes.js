const express = require('express')
const jwt = require('../../../lib/jwt')
const Entry = require('./entry.model')
const Story = require('../story.model')
const yup = require('yup')

const router = express.Router({ mergeParams: true })

const schema = yup.object().shape({
  title: yup.string().trim().min(3).required(),
  description: yup.string().trim().min(3).required(),
  date: yup.string(),
  embed: yup.string().trim().min(5).required(),
  format_id: yup.number().integer().required(),
  storyId: yup.number().integer().required(),
})

//Post new entry
router.post('/', async (req, res, next) => {
  const { storyId } = req.params
  const { title, description, date, embed, format_id } = req.body
  const decodedToken = await jwt.verify(req.token)
  const story = await Story.query().findById(storyId)

  try {
    await schema.validate({
      title,
      description,
      date,
      embed,
      format_id,
      storyId,
    })
    if (story) {
      await Entry.query().insert({
        title,
        description,
        date,
        embed,
        format_id,
        user_id: decodedToken.id,
        story_id: storyId,
      })
      return res.status(201).json({ msg: `Entry added to ${story.title}` })
    }
    return res.status(401).json({ error: 'Story not found' })
  } catch (error) {
    next(error)
  }
})

// Get one entry
router.get('/:id', async (req, res, next) => {
  const { id, storyId } = req.params
  const entry = await Entry.query()
    .withGraphFetched('[story, user(nameAndId)]')
    .modifiers({
      nameAndId(builder) {
        builder.select('id', 'username')
      },
    })
    .findById(id)

  try {
    if (!entry) {
      return res.status(401).json({ error: 'entry does not exist' })
    }

    return res.status(200).json(entry)
  } catch (error) {
    next(error)
  }
})

// Edit an entry
router.put('/edit/:id', async (req, res, next) => {
  const { id, storyId } = req.params
  const { title, description, date, embed, format_id } = req.body
  const decodedToken = await jwt.verify(req.token)
  const editItem = await Entry.query().withGraphFetched('story').findById(id)
  if (!editItem) return res.status(401).json({ error: 'item does not exist' })
  const isVerified = decodedToken.id === editItem.story.author_id
  try {
    await schema.validate({
      title,
      description,
      date,
      embed,
      format_id,
      storyId,
    })
    if (isVerified) {
      await Entry.query().where({ id }).andWhere('story_id', storyId).patch({
        title,
        description,
        date,
        embed,
      })
      return res.status(200).json({ msg: `${editItem.title} updated` })
    }
    return res.status(401).json({ error: 'unauthenticated' })
  } catch (error) {
    next(error)
  }
})

//Delete an entry from a story
router.delete('/:id', async (req, res, next) => {
  const { id, storyId } = req.params
  const decodedToken = await jwt.verify(req.token)
  const item = await Entry.query().withGraphFetched('story').findById(id)
  if (!item) return res.status(404).json({ error: 'item not found' })
  const isVerified = decodedToken.id === item.story.author_id
  try {
    if (isVerified) {
      await Entry.query().del().where({ id })
      return res.status(200).json({ msg: `${item.title} deleted` })
    }
    return res.status(401).json({ error: 'Unauthenticated' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
