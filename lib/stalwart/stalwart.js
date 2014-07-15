var Bijous, Stalwart, envirofig, exports, path, root, winston,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

path = require('path');

Bijous = require('bijous');

envirofig = require('envirofig');

winston = require('winston');

root = require('root-finder');

Stalwart = (function(_super) {
  __extends(Stalwart, _super);

  function Stalwart(options) {
    var _ref;
    if (options == null) {
      options = {};
    }
    this.application = (_ref = options.application) != null ? _ref : 'untitled';
    this.initializeConfig();
    this.initializeLogger();
    if (options.bundles == null) {
      options.bundles = this.config.bundles[this.application];
    }
    if (options.cwd == null) {
      options.cwd = path.join(root.path, 'lib');
    }
    Stalwart.__super__.constructor.call(this, options);
  }

  Stalwart.prototype.initializeConfig = function() {
    return this.config = envirofig.init({
      cwd: path.join(root.path, 'config'),
      namespace: this.application
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

exports = module.exports = Stalwart;
