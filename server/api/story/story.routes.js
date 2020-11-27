const express = require('express')
const jwt = require('../../lib/jwt')
const Story = require('./story.model')
const yup = require('yup')

const router = express.Router()

const schema = yup.object.shape({
  title: yup.string().trim().min(3).required(),
})

router.get('/', async (req, res, next) => {
  const stories = await Story.query()
  res.status(200).json(stories)
})

router.post('/create', async (req, res, next) => {
  const { title } = req.body
  try {
    await schema.validate(title)
    const decodedToken = await jwt.verify(req.token)
    if (!req.token || !decodedToken.id) {
      const error = new Error('token missing or invalid')
      res.status(401)
      throw error
    }
    const newStory = Story.query().insert({ title })
    res.status(201).json({ msg: `${title} created!` })
  } catch (error) {
    next(error)
  }
})

module.exports = router
