const express = require('express')
const HashTag = require('../../story/entry/hashtag/hashtag.model')
const Entry = require('../../story/entry/entry.model')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const { searchTerm } = req.query
  try {
    const findMe = await HashTag.query()
      .where({ tagname: 'Birthday' })
      .withGraphFetched('entry.story')
    if (findMe) {
      return res.json(findMe)
    }
    return res.status(401)
  } catch (error) {
    next(error)
  }
})

module.exports = router
