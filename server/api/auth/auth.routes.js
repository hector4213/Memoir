const express = require('express')
const yup = require('yup')

const router = express.Router()

const schema = yup.object().shape({
  username: yup.string().trim().min(2).required(),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
    .matches(/[A-Z]/, 'password must contain an uppercase letter')
    .matches(/[a-z]/, 'password must contain a lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .required(),
})
router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    const newUser = { username, email, password }
    await schema.validate(newUser)
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  res.json({ msg: 'login' })
})

module.exports = router
