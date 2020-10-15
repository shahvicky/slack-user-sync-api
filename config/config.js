'use strict'

const dotenv = require('dotenv')
const path = require('path')
const Config = require('@logdna/env-config')

if (process.env.NODE_ENV === 'production') {
  dotenv.config({path: path.join(__dirname, '../tools/.env')})
} else {
  dotenv.config({path: path.join(__dirname, '../tools/local.env')})
}

const LEVELS = [
  'fatal'
, 'error'
, 'warn'
, 'info'
, 'debug'
, 'trace'
, 'silent'
]

module.exports = new Config([
  Config
    .enum('loglevel')
    .default('info')
    .desc('The loglevel for the app')
    .values(LEVELS)
, Config
    .boolean('logpretty')
    .default(false)
    .desc('When false, JSON is logged. When true, the logs are prettier.')
, Config
    .number('server-port')
    .default(8000)
    .desc('Port on which the api server runs')
, Config
    .string('sql-host')
    .default('localhost')
    .desc('The sql db hostname')
, Config
    .number('sql-port')
    .default(3306)
    .desc('The sql db port')
, Config
    .string('sql-dialect')
    .default('mysql')
    .desc('The sql db type/dialect')
, Config
    .string('sql-user')
    .required()
    .desc('The sql db user name')
, Config
    .string('sql-pass')
    .required()
    .desc('The sql db password')
, Config
    .string('sql-db')
    .default('database')
    .desc('The sql database name')
, Config
    .string('slack-token')
    .required()
    .desc('OAuth token to make slack api calls')
])
