'use strict'

const {test, threw} = require('tap')
const {setup, teardown, supertest} = require('../common/bootstrap.js')
const {models, users} = require('./../../db/index.js')
const {getValidUser} = require('./../data/valid-users.js')

async function truncateTable() {
  await models.Users.destroy({
    truncate: true
  })
}

test('http routes', async (t) => {

  await setup()

  t.test('GET /api/v1/user success', async (tt) => {
    // setup
    const TOTAL_USERS = 3
    const newUsers = getValidUser(TOTAL_USERS)
    await users.bulkSave(newUsers)

    // test
    const res = await supertest.get('/api/v1/user')

    // validation
    tt.equal(res.status, 200, '200 status code')
    tt.true(res.body.success)
    tt.equal(res.body.data.length, TOTAL_USERS, 'same number of users retrieved as present in db')

    tt.tearDown(async () => {
      await truncateTable()
    })
  })

  t.test('GET /api/v1/user fails', async (tt) => {
    // setup
    const get = users.get

    users.get = () => {
      return new Promise((resolve, reject) => {
        setImmediate(() => {
          const error = new Error('User get error')
          error.code = '1001'
          reject(error)
        })
      })
    }

    // test
    const res = await supertest.get('/api/v1/user')

    // validation
    tt.equal(res.status, 200, '200 status code')
    tt.false(res.body.success)
    tt.equal(res.body.error.code, '1001', 'error code matches as mocked in get call')

    tt.tearDown(async () => {
      users.get = get
    })
  })

}).catch(threw)

teardown()
