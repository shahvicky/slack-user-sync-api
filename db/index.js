
'use strict'

const {connection, sql} = require('./connection.js')
const models = require('./models/index.js')
const query = require('./query/index.js')

module.exports = {
  connection
, models
, sql
, ...query
}
