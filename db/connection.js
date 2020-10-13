'use strict'

const {Sequelize} = require('sequelize')
const config = require('../config/config.js')
const log = require('../config/log.js').child({module: 'sequelize'})

Sequelize.Promise = global.Promise

// connect to db using env variables
const sql = {
  host: config.get('sql-host')
, port: config.get('sql-port')
, dialect: config.get('sql-dialect')
, username: config.get('sql-user')
, password: config.get('sql-pass')
, database: config.get('sql-db')
}
const connection = new Sequelize(sql.database, sql.username, sql.password, {
  host: sql.host
, port: sql.port
, dialect: sql.dialect
, logging: log.debug.bind(log)
, pool: {
    max: 5
  , min: 0
  , acquire: 30000
  , idle: 10000
  }
})

module.exports = {connection, sql}
