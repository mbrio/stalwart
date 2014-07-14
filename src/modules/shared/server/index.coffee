express = require 'express'
http = require 'http'

exports = module.exports = (bijous, services, done) ->
  app = express()
  app.set 'port', bijous.config.webServer.port

  server = http.createServer app

  done null,
    app: app
    express: express
    server: server
