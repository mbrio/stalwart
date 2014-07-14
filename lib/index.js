var Bijous, Stalwart, envirofig, path, stal, startTime, winston,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

path = require('path');

Bijous = require('bijous');

envirofig = require('envirofig');

winston = require('winston');

Stalwart = (function(_super) {
  __extends(Stalwart, _super);

  function Stalwart(options) {
    var _ref;
    if (options == null) {
      options = {};
    }
    this.initializeConfig();
    this.initializeLogger();
    this.application = (_ref = options.application) != null ? _ref : 'untitled';
    if (options.bundles == null) {
      options.bundles = this.config.bundles[this.application];
    }
    Stalwart.__super__.constructor.call(this, options);
  }

  Stalwart.prototype.initializeConfig = function() {
    return this.config = envirofig.init({
      cwd: path.join(__dirname, '..', 'config'),
      namespace: 'stalwart'
    });
  };

  Stalwart.prototype.initializeLogger = function() {
    this.logger = new winston.Logger();
    this.logger.setLevels(winston.config.npm.levels);
    return this.logger.add(winston.transports.Console, this.config.logger);
  };

  Stalwart.prototype.start = function(cb) {
    return this.load('private', cb);
  };

  return Stalwart;

})(Bijous);

stal = new Stalwart({
  application: 'server'
});

stal.logger.silly('Starting application in *%s* mode', stal.config.getEnvironment());

startTime = process.hrtime();

stal.start(function(err, services) {
  var app, server, _ref, _ref1;
  _ref = services["private"].server, server = _ref.server, app = _ref.app;
  (_ref1 = stal.logger).silly.apply(_ref1, ['Loaded all modules in %ds and %dns'].concat(__slice.call(process.hrtime(startTime))));
  return server.listen(app.get('port'), function(err) {
    if (err) {
      throw err;
    }
    return stal.logger.silly('Web server is now listening on port %d', app.get('port'));
  });
});
