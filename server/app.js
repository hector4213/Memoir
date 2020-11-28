const express = require('express')
const middleware = require('./utils/middleware')
const logger = require('morgan')
const cors = require('cors')

const api = require('./api')

const app = express()

app.use(logger('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(middleware.tokenExtractor)

app.use('/api', api)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
