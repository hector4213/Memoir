const express = require('express')
const searchEntries = require('./entries/searchEntries')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ msg: 'The Search API' })
})

router.use('/entries', searchEntries)
module.exports = router
