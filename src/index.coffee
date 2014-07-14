path = require 'path'
Bijous = require 'bijous'
envirofig = require 'envirofig'
winston = require 'winston'

class Stalwart extends Bijous
  constructor: (options = {}) ->
    @initializeConfig()
    @initializeLogger()

    @application = options.application ? 'untitled'

    options.bundles ?= @config.bundles[@application]
    super options

  initializeConfig: ->
    @config = envirofig.init
      cwd: path.join __dirname, '..', 'config'
      namespace: 'stalwart'

  initializeLogger: ->
    @logger = new winston.Logger()
    @logger.setLevels winston.config.npm.levels
    @logger.add winston.transports.Console, @config.logger

  start: (cb) -> @load 'private', cb

stal = new Stalwart { application: 'server' }

stal.logger.silly 'Starting application in *%s* mode',
  stal.config.getEnvironment()

startTime = process.hrtime()
stal.start (err, services) ->
  {server, app} = services.private.server

  stal.logger.silly 'Loaded all modules in %ds and %dns',
    process.hrtime(startTime)...

  server.listen app.get('port'), (err) ->
    throw err if err
    stal.logger.silly 'Web server is now listening on port %d',
      app.get 'port'
