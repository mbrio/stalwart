var exports, express, http;

express = require('express');

http = require('http');

exports = module.exports = function(bijous, services, done) {
  var app, server;
  app = express();
  app.set('port', bijous.config.webServer.port);
  server = http.createServer(app);
  bijous.on('done', function() {
    return server.listen(app.get('port'), function(err) {
      if (err) {
        throw err;
      }
      return bijous.logger.silly('Web server is now listening on port %d', app.get('port'));
    });
  });
  return done(null, {
    app: app,
    express: express,
    server: server
  });
};
