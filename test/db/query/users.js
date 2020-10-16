'use strict'

const {test, threw} = require('tap')
const {setup, teardown} = require('../../common/bootstrap.js')
const {models, users} = require('./../../../db/index.js')
const {getValidUser} = require('./../../data/valid-users.js')

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

  t.test('user get works', async (tt) => {
    const TOTAL_USERS = 3
    const newUsers = getValidUser(TOTAL_USERS)
    await saveUsers(newUsers)
    const allUsers = await users.get()
    tt.equal(allUsers.length, TOTAL_USERS, 'total number of users')

    tt.tearDown(async () => {
      await truncateTable()
    })
  })

  t.test('save user works', async (tt) => {
    const newUser = getValidUser()
    const user = await users.save(newUser)
    tt.equal(user.email, newUser.email, 'correct user saved')
    tt.tearDown(async () => {
      await truncateTable()
    })
  })

  t.test('bulk create works', async (tt) => {
    const TOTAL_USERS = 3
    const newUsers = getValidUser(TOTAL_USERS)
    await users.bulkSave(newUsers)
    const allUsers = await users.get()
    tt.equal(allUsers.length, newUsers.length, 'bulk save created correct number of users')
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

  t.test('user upsert updates existing user', async (tt) => {
    // setup
    const TOTAL_USERS = 3
    const newUsers = getValidUser(TOTAL_USERS)
    await saveUsers(newUsers)

    const updatedUser = newUsers[0]
    updatedUser.email = 'updated-email@gmail.com'
    const [record, isCreated] = await users.upsert(updatedUser)

    tt.equal(record.email, updatedUser.email, 'email got updated by upsert')
    tt.false(isCreated, 'new user not created')

    tt.tearDown(async () => {
      await truncateTable()
    })
  })

  t.test('user upsert creates new user if not exist', async (tt) => {
    // setup
    const TOTAL_USERS = 3
    const newUsers = getValidUser(TOTAL_USERS)
    await saveUsers(newUsers)

    // test
    const newUser = getValidUser()
    const [record, isCreated] = await users.upsert(newUser)

    // validation
    const allUsers = await users.get()
    tt.equal(allUsers.length, TOTAL_USERS + 1, 'total users is 1 more than the original')
    tt.true(isCreated, 'new user created')

    tt.tearDown(async () => {
      await truncateTable()
    })
  })

}).catch(threw)

teardown()
