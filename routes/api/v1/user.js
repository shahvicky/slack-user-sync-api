'use strict'

const express = require('express')
const router = express.Router()
const {userCtrl} = require('./../../../controller/index.js')

// mount user get routes on /api/v1/user
router.route('/')
  .get(userCtrl.get)

module.exports = router
