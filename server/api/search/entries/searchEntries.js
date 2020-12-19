const express = require('express')
const Hashtag = require('../../story/entry/hashtag/hashtag.model')
const Entry = require('../../story/entry/entry.model')
const router = express.Router()

// Search by tags
router.get('/', async (req, res, next) => {
  const { tag } = req.query

  try {
    const query = Hashtag.query().where('tagname', 'ilike', `%${tag}%`)
    const result = await Hashtag.relatedQuery('entry')
      .withGraphFetched('[hashtags(onlyName),story]')
      .for(query)
      .where({ entry_status: 1 })

    if (result.length > 0) {
      return res.status(200).json(result)
    }
    return res.status(401).json({ msg: 'No results found' })
  } catch (error) {
    next(error)
  }
})

//Search by entry title
router.get('/title', async (req, res, next) => {
  const { title } = req.query
  try {
    const result = await Entry.query()
      .where('title', 'ilike', `%${title}%`)
      .withGraphFetched('story')
    if (result.length > 0) {
      return res.status(200).json(result)
    }
    return res.status(200).json({ msg: 'No results found' })
  } catch (error) {
    next(error)
  }
})

//Search by date

router.get('/date', async (req, res, next) => {
  const { month, year, day } = req.query
  try {
    if (month && year && day) {
      const result = Entry.query().where('date', `${year}-${month}-${day}`)
    }
    if (result.length > 0) {
      return res.status(200).json(result)
    }
    return res.status(200).json({ msg: 'No results for that date found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
