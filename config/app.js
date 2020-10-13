'use strict'

const express = require('express')
const helmet = require('helmet')
const xss = require('xss-clean')
const compression = require('compression')
const cors = require('cors')
const httpStatus = require('http-status')
const routes = require('../routes/index.js')
const ApiError = require('../utils/api-error.js')
const log = require('./log.js')
const pino = require('express-pino-logger')({logger: log})

const app = express()

// set security HTTP headers
app.use(helmet())

// attach logger
app.use(pino)

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({extended: true}))

// sanitize request data
app.use(xss())

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// api routes
app.use('/api', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new ApiError('API not found', httpStatus.NOT_FOUND)
  return next(err)
})

module.exports = app
