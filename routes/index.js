'use strict'

const express = require('express')
const internalRoutes = require('./api/index.js')

const router = express.Router()

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
)

// mount all internal routes routes on /api
router.use('/api', internalRoutes)

module.exports = router
