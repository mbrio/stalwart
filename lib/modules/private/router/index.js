var exports;

exports = module.exports = function(bijous, services, done) {
  var app, express, router, server, _ref;
  _ref = services["private"].server, app = _ref.app, express = _ref.express, server = _ref.server;
  router = express.Router();
  router.get('/', function(req, res) {
    return res.jsonp({
      message: 'hello'
    });
  });
  app.use(router);
  return done(null, null);
};
