var exports, express, http;

express = require('express');

http = require('http');

exports = module.exports = function(bijous, services, done) {
  var app, server;
  app = express();
  app.set('port', bijous.config.webServer.port);
  server = http.createServer(app);
  return done(null, {
    app: app,
    express: express,
    server: server
  });
};
