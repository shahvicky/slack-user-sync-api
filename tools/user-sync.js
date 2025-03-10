'use strict'

const {api: slackApi} = require('./../slack/index.js')
const {users: userApi} = require('./../db/index.js')
const log = require('./../config/log.js')

/**
 * Sync current users from slack during server start
 */
async function getUsers() {
  try {
    const slackUsers = await slackApi.user.list()
    if (!slackUsers.ok) {
      const err = new Error('Error in fetching users from slack')
      err.message = slackUsers.error
      throw err
    }
    for (const user of slackUsers.members) {
      const dbUser = transforUser(user)
      if (dbUser) {
        // create upsert to user table
        await userApi.upsert(dbUser)
      }
    }
    log.info('Current users saved to db')

  } catch (error) {
    log.log(error)
    throw error
  }
}

function transforUser(userDoc) {
  if (userDoc.deleted || !userDoc.profile.email) {
    return null
  }
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
  , lastUpdated: userDoc.updated * 1000 || Date.now() // may be incorrect if updated value is not present
  , timeZone: userDoc.tz
  }
  return user
}

if (require.main === module) {
  getUsers()
} else {
  module.exports = getUsers
}
