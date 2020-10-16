'use strict'

const UserModel = require('./../models/users.js')

module.exports = {
  bulkSave
, get
, save
, upsert
}

async function get() {
  try {
    const users = await UserModel.findAll()
    return users
  } catch (error) {
    const er = new Error('Unable to get users')
    er.code = 'EUSERGET'
    er.meta = {
      error
    }
    throw er
  }
}

async function save(data) {
  try {
    const user = await UserModel.create(data)
    return user
  } catch (error) {
    const er = new Error('Unable to save user')
    er.code = 'EUSERSAVE'
    er.meta = {
      error
    }
    throw er
  }
}

async function bulkSave(users, opts) {
  const options = {
    validate: true
  , ...opts
  }
  try {
    await UserModel.bulkCreate(users, options)
  } catch (error) {
    const er = new Error('Unable to create users in bulk')
    er.code = 'EUSERBULKSAVE'
    er.meta = {
      error
    }
    throw er
  }
}

async function upsert(user, opts) {
  const options = {
    validate: true
  , ...opts
  }
  try {
    const [record, isCreated] = await UserModel.upsert(user, options)
    return [record, isCreated]
  } catch (error) {
    const er = new Error('Unable to insert/update the record')
    er.code = 'EUSERUPSERT'
    er.meta = {
      error
    }
    throw er
  }
}
