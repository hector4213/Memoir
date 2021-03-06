const express = require('express')
const yup = require('yup')
const bcrypt = require('bcrypt')
const jwt = require('../../lib/jwt')
const User = require('../users/users.model')

const router = express.Router()

const schema = yup.object().shape({
  username: yup.string().trim().min(2).required(),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .min(5)
    .max(100)
    .matches(/[a-z]/, 'password must contain a lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .required(),
})

router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    const newUser = { username, email, password }
    await schema.validate(newUser)
    const existingUserName = await User.query().where({ username }).first()
    const existingUser = await User.query().where({ email }).first()
    if (existingUser) {
      res.status(403).json({ error: 'email already in use' })
    }
    if (existingUserName) {
      res.status(403).json({ error: 'username already in use' })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const insertUser = await User.query().insert({
      username,
      email,
      password: hashedPassword,
    })
    delete insertUser.password
    const payload = {
      id: insertUser.id,
      username,
      email,
    }
    const token = await jwt.sign(payload)
    res.status(201).json({ user: payload, token })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    await schema.validate({
      username: 'user',
      email,
      password,
    })
    const user = await User.query().where({ email }).first()
    if (!user) {
      res.status(401).json({ error: 'user not found' })
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      res.status(401).json({ error: 'incorrect password' })
    }
    const payload = {
      id: user.id,
      username: user.username,
      email,
    }
    const token = await jwt.sign(payload)
    res.status(200).json({
      user: payload,
      token,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
