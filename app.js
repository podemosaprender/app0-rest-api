//INFO: api rest para db relacional, ejemplo 1
//ASK: https://pizarra.podemosaprender.org/2018/04/contacto.html
//ASK: aprender@mauriciocap.com

var Sequelize = require('sequelize')
  , finale = require('finale-rest')
  , http = require('http')
  , db      = require('./models')
	;
//A: cargue modulos que necesito

var server, app;
var express = require('express'),
		bodyParser = require('body-parser');

var app = express();
app.set('port', process.env.PORT || 3000); //A: si me pasan PORT= tengo que usar ese (ej. heroku)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
server = http.createServer(app);
//A: configure servidor web

finale.initialize({
  app: app,
  sequelize: db.sequelize
});
//A: conecte finale (que atiende pedidos rest) al servidor web y mi db

var userResource = finale.resource({
  model: db.User,
  endpoints: ['/users', '/users/:id']
});
//A: cree urls (endpoints) REST para mi tabla de usuarios 

db.sequelize
  .sync({ force: true })//A: actualice db segun modelos
  .then(function() {
    server.listen(app.get('port'),function() {
      var host = server.address().address,
          port = server.address().port;
      console.log('listening at http://%s:%s', host, port);
    });
}); //A: lance servidor y mostre en que puerto

