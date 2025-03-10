'use strict'

const {users} = require('./../db/index.js')
const log = require('./../config/log.js')

const EVENT_TYPE = {
  VERIFICATION: 'url_verification'
, USER: {
    USER_CHANGE: 'user_change'
  , TEAM_JOIN: 'team_join'
  }
}

/**
 * Format the slack user object to save to user table
 * @param {object} userDoc user object as sent by the slack event
 */
const transformUser = function(userDoc) {
  const user = {
    userid: userDoc.id
  , teamid: userDoc.team_id
  , firstName: userDoc.profile.first_name
      || userDoc.profile.display_name
      || userDoc.real_name
      || userDoc.name
      || 'Slack User'
  , lastName: userDoc.profile.last_name
  , email: userDoc.profile.email
  , image: userDoc.profile.image_original || userDoc.profile.image_192
  , isDeleted: userDoc.deleted
  , isOwner: userDoc.is_owner
  , isAdmin: userDoc.is_admin
  , isBot: userDoc.is_bot
  , lastUpdated: userDoc.updated * 1000
  , timeZone: userDoc.tz
  }
  return user
}

/**
 * Middleware to get all users stored in the user table
 * @param {object} req the HTTP request
 * @param {object} res the HTTP response
 * @param {*} next method to call the next middleware/route handler
 */
const get = async function(req, res, next) {
  try {
    const allUsers = await users.get()
    res.json({
      success: true
    , data: allUsers
    })
    return next()
  } catch (e) {
    log.error(e)
    res.json({
      success: false
    , error: e
    })
  }
}

/**
 * Middleware to handle webhook events from slack
 * @param {object} req the HTTP request
 * @param {object} res the HTTP response
 * @param {*} next method to call the next middleware/route handler
 */
const userWebhook = async function(req, res, next) {
  const body = req.body
  const outerEventType = body && body.type
  if (outerEventType === EVENT_TYPE.VERIFICATION) {
    res.send(body.challenge)
    return next()
  }
  res.status(200).send('OK')

  const event = body.event
  const innerEventType = event.type

  const transformedUser = transformUser(event.user)

  if ((innerEventType === EVENT_TYPE.USER.TEAM_JOIN)
    || (innerEventType === EVENT_TYPE.USER.USER_CHANGE)) {
    await users.upsert(transformedUser)
  }
  return next()
}

module.exports = {
  get
, userWebhook
}
