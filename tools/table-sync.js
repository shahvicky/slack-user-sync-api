'use strict'

const {models} = require('./../db/index.js')
const log = require('./../config/log.js')

/**
 * Sync tables to database during server start
 */
function syncTables() {
  return new Promise((resolve, reject) => {
    models.Users.sync()
      .then(() => {
        resolve()
      })
      .catch((err) => {
        log.error(err)
      })
  })
}

if (require.main === module) {
  syncTables()
} else {
  module.exports = syncTables
}
