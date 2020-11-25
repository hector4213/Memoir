const express = require('express')
const router = express.Router()

const users = require('./users/users.routes')

/* GET home page. */
router.get('/', async (req, res) => {
  res.json({ msg: 'Memoir API' })
})

router.use('/users', users)
module.exports = router
