const express = require('express')
const Hashtag = require('../../story/entry/hashtag/hashtag.model')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const { tag } = req.query

  try {
    const query = Hashtag.query().where('tagname', 'like', `%${tag}%`)
    const isFound = await Hashtag.relatedQuery('entry')
      .withGraphFetched('story')
      .for(query)
      .where({ entry_status: 1 })

    if (isFound.length > 0) {
      return res.status(200).json(isFound)
    }
    return res.status(401).json({ msg: 'No results found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
