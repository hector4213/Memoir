const express = require('express')
const logger = require('morgan')

const api = require('./api/index')

const app = express()

app.use(logger('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', api)

module.exports = app
