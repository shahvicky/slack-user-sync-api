'use strict'

const {users} = require('./../db/index.js')
const log = require('./../config/log.js')

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

module.exports = {
  get
}
