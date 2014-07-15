Stalwart = require('./stalwart').Stalwart

wart = new Stalwart { application: 'server' }

wart.logger.silly 'Starting application *%s* in *%s* mode',
  wart.application, wart.config.getEnvironment()

startTime = process.hrtime()
wart.start (err, services) ->
  {server, app} = services.private.server

  wart.logger.silly 'Loaded all modules in %ds and %dns',
    process.hrtime(startTime)...

  server.listen app.get('port'), (err) ->
    throw err if err
    wart.logger.silly 'Web server is now listening on port %d',
      app.get 'port'
