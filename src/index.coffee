path = require 'path'
Bijous = require 'bijous'
envirofig = require 'envirofig'
winston = require 'winston'

startTime = process.hrtime()

config = envirofig.init
  cwd: path.join __dirname, '..', 'config'
  namespace: 'stalwart'

logger = new winston.Logger()
logger.setLevels winston.config.npm.levels
logger.add winston.transports.Console, config.logger

logger.silly 'Starting application in *%s* mode', config.getEnvironment()

bijous = new Bijous
  bundles: config.bundles

bijous.config = config
bijous.logger = logger

bijous.on 'loaded', (name, bundle, services) ->
  logger.silly 'Completed loading %s/%s', bundle, name

bijous.load 'private', (err, services) ->
  logger.silly 'Loaded all modules in %ds and %dns',
    process.hrtime(startTime)...
