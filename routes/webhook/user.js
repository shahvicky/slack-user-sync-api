'use strict'

const express = require('express')
const router = express.Router()
const {userCtrl} = require('./../../controller/index.js')

// mount user get routes on /webhook/user
router.route('/')
  .post(userCtrl.userWebhook)

module.exports = router
