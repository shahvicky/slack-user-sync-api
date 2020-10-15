'use strict'

const client = require('./../client.js')

module.exports = {
  list
}

async function list() {
  try {
    const users = await client.users.list()
    return users
  } catch (error) {
    const err = new Error('Unable to fetch users from slack')
    err.code = 'EUSERSGET'
    err.meta = {
      error
    }
    throw err
  }
}
