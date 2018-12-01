var Sequelize = require('sequelize')
  , finale = require('finale-rest')
  , http = require('http')
  , db      = require('./models')
	;

// Initialize server
var server, app;
var express = require('express'),
		bodyParser = require('body-parser');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
server = http.createServer(app);

// Initialize finale
finale.initialize({
  app: app,
  sequelize: db.sequelize
});

// Create REST resource
var userResource = finale.resource({
  model: db.User,
  endpoints: ['/users', '/users/:id']
});

// Create database and listen
db.sequelize
  .sync({ force: true })
  .then(function() {
    server.listen(function() {
      var host = server.address().address,
          port = server.address().port;

      console.log('listening at http://%s:%s', host, port);
    });
});
