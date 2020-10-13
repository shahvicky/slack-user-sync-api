'use strict'

const config = require('./config/config.js')
config.validateEnvVars()

const {connection, sql} = require('./db/index.js')
const log = require('./config/log.js').child({module: 'index'})
const app = require('./config/app.js')

const serverPort = config.get('server-port')

module.exports = {
  start
, stop
}
let server

function start(cb) {
  // connect to sql db
  connection.authenticate()
    .then(() => {
      log.info({
        database: sql.database
      }, 'Connected to sql database')

      server = app.listen(serverPort, () => {
        log.info('Server listening on port %d', serverPort)
        cb()
      })
    })
}

function stop(cb) {
  // disconnect sql db
  connection.close()
    .then(() => {
      log.info({
        database: sql.database
      }, 'Disconnected to sql database')
      // stop server
      if (server) {
        server.close(() => {
          log.info('Server stopped')
          cb()
        })
      }
    })
}

/* istanbul ignore next */
function onSignal(signal) {
  log.warn({signal}, 'received signal')
  stop((err) => {
    if (err) {
      /* istanbul ignore next */
      log.error(err)
    }
  })
}

if (require.main === module) {
  start(() => {
    process.once('SIGTERM', onSignal)
    process.once('SIGINT', onSignal)
  })
}
