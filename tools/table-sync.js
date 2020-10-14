'use strict'

const {models} = require('./../db/index.js')

async function syncTables() {
  await models.Users.sync()
}

syncTables()

