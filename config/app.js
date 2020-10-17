'use strict'

const express = require('express')
const errorHandler = require('errorhandler')
const helmet = require('helmet')
const xss = require('xss-clean')
const compression = require('compression')
const cors = require('cors')
const routes = require('../routes/index.js')
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

// mount all routes on /
app.use('/', routes)

// error handler, send stacktrace only during development
if (process.env.NODE_ENV !== 'production') {
  app.use(errorHandler())
} else {
  app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
      success: false
    , error: err
    })
  })
}

module.exports = app
