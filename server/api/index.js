const express = require('express')
const router = express.Router()

const users = require('./users/users.routes')
const auth = require('./auth/auth.routes')

/* GET home page. */
router.get('/', async (req, res) => {
  res.json({ msg: 'Memoir API' })
})

router.use('/users', users)
router.use('/auth', auth)
module.exports = router
