INFO: api rest para db relacional, ejemplo 1

ASK: https://pizarra.podemosaprender.org/2018/04/contacto.html

ASK: aprender@mauriciocap.com

Crear app en heroku

```
heroku create
git push heroku master
(todo lo que hace en heroku)

heroku addons:create heroku-postgresql:hobby-dev
heroku config:get DATABASE_URL

heroku ps:scale web=1
heroku open
heroku logs --tail
```

Consultar usuarios

``` 
curl `heroku apps:info -s | grep web_url | cut -d= -f2`users
```


Crear un usuario
```
curl -d '{"username":"Ubaldo Uno", "birthday":"1991/01/01"}' -H "Content-Type: application/json" -X POST `heroku apps:info -s | grep web_url | cut -d= -f2`users
```

Para entender el código:

* https://github.com/tommybananas/finale
* http://docs.sequelizejs.com/manual/installation/usage.html

