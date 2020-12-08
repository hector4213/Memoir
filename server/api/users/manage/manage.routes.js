const express = require('express')
const Entry = require('../../story/entry/entry.model')
const Story = require('../../story/story.model')
const jwt = require('../../../lib/jwt')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res, next) => {
  //get array of users story ids
  const userStories = Story.query()
    .select('id')
    .where({ author_id: req.params.user })
  // Find all entries in all of users stories where user is not entry author
  const foreignEntries = await Entry.query()
    .whereIn('story_id', userStories)
    .whereNot({ user_id: req.params.user })
    .withGraphFetched('user')

  res.sendStatus(200).json(foreignEntries)
})

module.exports = router
