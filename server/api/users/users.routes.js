const express = require('express')
const User = require('./users.model')

const router = express.Router()

// GET all users
router.get('/', async (req, res, next) => {
  const users = await User.query()
    .select('id', 'username')
    .withGraphFetched('stories.entries.[user(nameAndId), format(onlyType)]')
    .modifiers({
      nameAndId(builder) {
        builder.select('id', 'username')
      },
      onlyType(builder) {
        builder.select('type')
      },
    })

  try {
    if (users) {
      return res.status(200).json(users)
    }
    return res.status(200).json({ error: 'No users found' })
  } catch (error) {}
})

// GET ONE user
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  const user = await User.query()
    .select('id', 'username')
    .withGraphFetched('stories.entries.[user(nameAndId), format(onlyType)]')
    .modifiers({
      nameAndId(builder) {
        builder.select('id', 'username')
      },
      onlyType(builder) {
        builder.select('type')
      },
    })
    .where({ id })
  try {
    if (user) {
      res.status(200).json(user)
    }
    return res.status(404).json({ error: 'no user found' })
  } catch (error) {}
  return res.json(user)
})
module.exports = router
