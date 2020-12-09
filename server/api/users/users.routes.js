const express = require('express')
const User = require('./users.model')
const jwt = require('../../lib/jwt')
const yup = require('yup')
const manage = require('./manage/manage.routes')

const router = express.Router({ mergeParams: true })

const schema = yup.object().shape({
  username: yup.string().trim().min(2).required(),
  email: yup.string().trim().email().required(),
})

// GET all users
router.get('/', async (req, res, next) => {
  const users = await User.query().select('id', 'username')

  try {
    if (users) {
      return res.status(200).json(users)
    }
    return res.status(200).json({ error: 'No users found' })
  } catch (error) {
    console.log(error)
  }
})

// GET ONE user profile
router.get('/:id', async (req, res, next) => {
  //need users.stories.entries.user
  const { id } = req.params
  const basicInfo = await User.query().select('id', 'username').findById(id)

  if (!basicInfo) {
    return res.status(404).json({ error: 'no user found' }).end()
  }

  if (!req.token && basicInfo) {
    return res.status(200).json(basicInfo).end()
  }

  try {
    const decodedToken = await jwt.verify(req.token)
    const isProfileOwner = decodedToken.id === Number(id)
    if (isProfileOwner) {
      const profile = await User.query()
        .select('id', 'username', 'email')
        .withGraphFetched('[stories, userEntries.story]')
        .findById(id)

      return res.status(200).json(profile)
    }
  } catch (error) {
    next(error)
  }

  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
      const decodedToken = jwt.verify(req.token)
      const isUser = decodedToken.id === Number(id)

      if (isUser) {
        await User.query().deleteById(id)
        res.status(204)
      }
    } catch (error) {
      next(error)
    }
  })

  router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { username, email } = req.body
    try {
      const decodedToken = await jwt.verify(req.token)
      const isUser = decodedToken.id === Number(id)

      if (isUser) {
        await schema.validate({ username, email })
        await User.query().findById(id).patch({
          username,
          email,
        })
        res.status(200).json({ msg: 'User updated' })
      }
    } catch (error) {
      next(error)
    }
  })
})

router.use('/:user/manage', manage)
module.exports = router
