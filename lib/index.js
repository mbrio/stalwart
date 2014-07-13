var Bijous, bijous, config, envirofig, logger, path, startTime, winston,
  __slice = [].slice;

path = require('path');

Bijous = require('bijous');

envirofig = require('envirofig');

winston = require('winston');

startTime = process.hrtime();

config = envirofig.init({
  cwd: path.join(__dirname, '..', 'config'),
  namespace: 'stalwart'
});

logger = new winston.Logger();

logger.setLevels(winston.config.npm.levels);

logger.add(winston.transports.Console, config.logger);

logger.silly('Starting application in *%s* mode', config.getEnvironment());

bijous = new Bijous({
  bundles: config.bundles
});

bijous.config = config;

bijous.logger = logger;

bijous.on('loaded', function(name, bundle, services) {
  return logger.silly('Completed loading %s/%s', bundle, name);
});

bijous.load('private', function(err, services) {
  return logger.silly.apply(logger, ['Loaded all modules in %ds and %dns'].concat(__slice.call(process.hrtime(startTime))));
});
