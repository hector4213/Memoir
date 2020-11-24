const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({ msg: 'users' })
})

module.exports = router
