'use strict'

const {test, threw} = require('tap')
const {setup, teardown} = require('../../common/bootstrap.js')
const {models, users} = require('./../../../db/index.js')
const validUsers = require('./../../data/valid-users.json')

async function saveUsers(data) {
  await models.Users.bulkCreate(data)
}

async function truncateTable() {
  await models.Users.destroy({
    truncate: true
  })
}

test('user query', async (t) => {

  await setup()

  const newUser =   {
    "userid": "u1003",
    "teamid": "t1003",
    "firstName": "first3",
    "lastName": "last3",
    "email": "first3.last3@gmail.com",
    "lastUpdated": 1602631704914,
    "timeZone": "America/Los_Angeles"
  }

  t.test('user get works', async (tt) => {
    validUsers.push(newUser)
    await saveUsers(validUsers)
    const allUsers = await users.get()
    tt.equal(allUsers.length, validUsers.length, 'total number of users')
    tt.match(JSON.stringify(allUsers), 'first3.last3@gmail.com', 'new user also exists')

    tt.tearDown(async () => {
      await truncateTable()
    })
  })

  t.test('save user works', async (tt) => {
    const user = await users.save(newUser)
    tt.equal(user.email, newUser.email, 'correct user saved')
    tt.tearDown(async () => {
      await truncateTable()
    })
  })

  t.test('bulk create works', async (tt) => {
    await users.bulkSave(validUsers)
    const allUsers = await users.get()
    tt.equal(allUsers.length, validUsers.length, 'bulk save created correct number of users')
    tt.tearDown(async () => {
      await truncateTable()
    })
  })

  t.test('user save throws error if user model does not validate', async (tt) => {
    const incorrectUser =   {
      "userid": "u1003",
      "teamid": "t1003",
      "firstName": "first3",
      "lastName": "last3",
      "email": "wrong-email-format",
      "lastUpdated": 1602631704914,
      "timeZone": "America/Los_Angeles"
    }
    try {
      await users.save(incorrectUser)
    } catch (error) {
      tt.equal(error.code, 'EUSERSAVE', 'wrong email throws error')
    }
  })

}).catch(threw)

teardown()
