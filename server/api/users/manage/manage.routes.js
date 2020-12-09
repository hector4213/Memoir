const express = require('express')
const Entry = require('../../story/entry/entry.model')
const Story = require('../../story/story.model')
const jwt = require('../../../lib/jwt')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res, next) => {
  const { user } = req.params

  if (!req.token) {
    res.status(401).json({ error: 'unauthenticated' })
  }
  const decodedToken = await jwt.verify(req.token)
  const isOwner = decodedToken.id === Number(user)

  if (!isOwner) {
    return res.status(401).json({ error: 'You are not the owner' })
  }
  const userStories = Story.query().select('id').where({ author_id: user })
  const foreignEntries = await Entry.query()
    .whereIn('story_id', userStories)
    .whereNot({ user_id: user })
    .withGraphFetched('[user(nameAndId), current(noId), story]')
    .modifiers({
      nameAndId(builder) {
        builder.select('id', 'username')
      },
      noId(builder) {
        builder.select('status')
      },
    })

  try {
    if (foreignEntries) {
      return res.status(200).json(foreignEntries)
    }
    return res.status(200).json({ msg: 'All entries are written by you' })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const { entry_status } = req.body
  const { id, user } = req.params
  if (!req.token) {
    res.status(401).json({ error: 'unauthenticated' })
  }
  const decodedToken = await jwt.verify(req.token)
  const isOwner = decodedToken.id === Number(user)
  const updateItem = await Entry.query().findById(id)
  if (!isOwner) {
    return res.status(401).json({ error: 'You are not the owner' })
  }

  try {
    if (updateItem) {
      await Entry.query().findById(id).patch({ entry_status })
      return res.status(200).json({ msg: 'Entry status updated' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
