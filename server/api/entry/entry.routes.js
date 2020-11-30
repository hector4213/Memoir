const express = require('express')
const jwt = require('../../lib/jwt')
const Story = require('../story/story.model')
const User = require('../users/users.model')
const Entry = require('../entry/entry.model')
const yup = require('yup')

const router = express.Router({ mergeParams: true })

router.put('/:id', async (req, res, next) => {
  const { id, storyId } = req.params
  const { title, description, date, embed } = req.body
  try {
    const updateEntry = await Entry.query()
      .where({ id })
      .andWhere('story_id', storyId)
      .patch({
        title,
        description,
        date,
        embed,
      })
    res.json(updateEntry)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id, storyId } = req.params
  try {
    const deleteItem = await Entry.query()
      .del()
      .where({ id })
      .andWhere('story_id', storyId)
    res.status(204).json({ msg: 'deleted' })
  } catch (error) {}
})

router.post('/', async (req, res, next) => {
  const { id, storyId } = req.params
  const { title, description, date, embed, format_id } = req.body
  try {
    const newEntry = await Entry.query().insert({
      title,
      description,
      date,
      embed,
      format_id,
      story_id: storyId,
    })
    res.status(201).json({ msg: 'new entry created!' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
