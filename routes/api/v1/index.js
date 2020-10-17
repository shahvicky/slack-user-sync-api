'use strict'

const express = require('express')
const userRoutes = require('./user.js')

const router = express.Router()

// mount user routes on /api/v1/user
router.use('/user', userRoutes)

module.exports = router
