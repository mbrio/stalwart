exports = module.exports = (bijous, services, done) ->
  {app, express, server} = services.private.server

  router = express.Router()

  router.get '/', (req, res) ->
    res.jsonp { message: 'hello' }

  app.use router

  done null, null
