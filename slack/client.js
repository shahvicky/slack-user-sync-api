'use strict'

const {WebClient} = require('@slack/web-api')
const config = require('./../config/config.js')
const SLACK_TOKEN = config.get('slack-token')

const client = new WebClient(SLACK_TOKEN)

module.exports = client
