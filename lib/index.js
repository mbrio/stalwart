var Stalwart, startTime, wart,
  __slice = [].slice;

Stalwart = require('./stalwart').Stalwart;

wart = new Stalwart({
  application: 'server'
});

wart.logger.silly('Starting application *%s* in *%s* mode', wart.application, wart.config.getEnvironment());

startTime = process.hrtime();

wart.start(function(err, services) {
  var app, server, _ref, _ref1;
  _ref = services["private"].server, server = _ref.server, app = _ref.app;
  (_ref1 = wart.logger).silly.apply(_ref1, ['Loaded all modules in %ds and %dns'].concat(__slice.call(process.hrtime(startTime))));
  return server.listen(app.get('port'), function(err) {
    if (err) {
      throw err;
    }
    return wart.logger.silly('Web server is now listening on port %d', app.get('port'));
  });
});
