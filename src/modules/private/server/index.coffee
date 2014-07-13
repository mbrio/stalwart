express = require 'express'
http = require 'http'

exports = module.exports = (bijous, services, done) ->
  app = express()
  app.set 'port', bijous.config.webServer.port

  server = http.createServer app

  bijous.on 'done', ->
    server.listen app.get('port'), (err) ->
      throw err if err
      bijous.logger.silly 'Web server is now listening on port %d',
        app.get 'port'

  done null,
    app: app
    express: express
    server: server
