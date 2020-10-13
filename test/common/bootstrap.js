'use strict'

const tap = require('tap')
const supertest = require('supertest')
const {start, stop} = require('../../index.js')
const app = require('./../../config/app.js')

module.exports = {
  setup
, supertest: supertest(app)
, teardown
}

function setup() {
  tap.test('setup', async(t) => {
    return new Promise((resolve, reject) => {
      start(() => {
        resolve()
      })
    })
  })
}

function teardown() {
  tap.test('teardown', (t) => {
    return new Promise((resolve, reject) => {
      stop(() => {
        t.pass('teardown complete')
        resolve()
      })
    })
  })
}
