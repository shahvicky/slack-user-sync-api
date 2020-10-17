'use strict'

const express = require('express')
const userHooks = require('./user.js')

const router = express.Router()

// mount user hook on /webhook/user
router.use('/user', userHooks)

module.exports = router
