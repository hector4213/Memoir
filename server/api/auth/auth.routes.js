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
    const existingUser = await User.query().where({ email }).first()
    console.log(existingUser)
    if (existingUser) {
      const error = new Error('Email already in use')
      res.status(403)
      throw error
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
  res.json({ msg: 'login' })
})

module.exports = router
