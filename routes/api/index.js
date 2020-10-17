'use strict'

const express = require('express')
const v1Routes = require('./v1/index.js')

const router = express.Router()

// mount all v1 routes on /api/v1
router.use('/v1', v1Routes)

module.exports = router
