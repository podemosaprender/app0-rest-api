const url= require('url');

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
		var dbUrl= new url.URL(process.env.DATABASE_URL);

    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     dbUrl.port,
      host:     dbUrl.hostname,
      logging:  true //false
    })
  } else {
    // the application is executed on the local machine ... use sqlite3
    sequelize = new Sequelize('example-app-db', 'root', null, {
  		dialect: 'sqlite',
			// the storage engine for sqlite
			// - default ':memory:'
			storage: 'datos.db'
		})
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/user') 
    // add your other models here
  }

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db
