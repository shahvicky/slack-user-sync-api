'use strict'

const {test, threw} = require('tap')
const {setup, teardown, supertest} = require('../common/bootstrap.js')

test('http routes', async (t) => {

  await setup()

  t.test('GET /api/health-check', async (tt) => {
    const res = await supertest.get('/api/health-check')
    tt.equal(res.status, 200, '200 status code')
    tt.equal(res.text, 'OK', 'OK response')
  })

  t.test('GET /not-found', async (tt) => {
    const res = await supertest.get('/not-found')
    tt.equal(res.status, 404, '404 status code')
    tt.match(res.text, /not found/ig)
  })

}).catch(threw)

teardown()
