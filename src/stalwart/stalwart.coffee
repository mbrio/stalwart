path = require 'path'
Bijous = require 'bijous'
envirofig = require 'envirofig'
winston = require 'winston'
root = require 'root-finder'

class Stalwart extends Bijous
  constructor: (options = {}) ->
    @application = options.application ? 'untitled'
    
    @initializeConfig()
    @initializeLogger()

    options.bundles ?= @config.bundles[@application]
    options.cwd ?= path.join root.path, 'lib'

    super options

  initializeConfig: ->
    @config = envirofig.init
      cwd: path.join root.path, 'config'
      namespace: @application

  initializeLogger: ->
    @logger = new winston.Logger()
    @logger.setLevels winston.config.npm.levels
    @logger.add winston.transports.Console, @config.logger

  start: (cb) -> @load 'private', cb

exports = module.exports = Stalwart
