const express = require('express')
const router = express.Router()

const users = require('./users/users.routes')
const auth = require('./auth/auth.routes')
const story = require('./story/story.routes')

/* GET home page. */
router.get('/', async (req, res) => {
  res.json({ msg: 'Memoir API' })
})

router.use('/profile', users)
router.use('/auth', auth)
router.use('/stories', story)
module.exports = router
