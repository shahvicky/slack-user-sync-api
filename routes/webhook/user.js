'use strict'

const express = require('express')
const router = express.Router()
const {userCtrl} = require('./../../controller/index.js')

/**
 * @api {post} /webhook/user Webhook for slack events
 * @apiName SlackUserEvents
 * @apiGroup User
 *
 * @apiSuccess (200) {String} challenge The Challenge verificatio for first time slack webhook configuration
 * @apiSuccess (200) {String} OK
 */
router.route('/')
  .post(userCtrl.userWebhook)

module.exports = router
