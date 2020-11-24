const express = require('express')
const logger = require('morgan')

const indexRouter = require('./api/index')
const usersRouter = require('./api/users')

const app = express()

app.use(logger('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/users', usersRouter)

module.exports = app
