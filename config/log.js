'use strict'

const pino = require('pino')
const pkg = require('../package.json')
const config = require('./config.js')

module.exports = pino({
  name: pkg.name
, level: config.get('loglevel')
, prettyPrint: config.get('logpretty')
}, pino.destination(process.stderr))
