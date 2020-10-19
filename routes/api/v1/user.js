'use strict'

const express = require('express')
const router = express.Router()
const {userCtrl} = require('./../../../controller/index.js')

/**
 * @api {get} /api/v1/user Get all users from database
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiSuccess (200) {Object[]} The array of user objects returned from the database
 */
router.route('/')
  .get(userCtrl.get)

module.exports = router
