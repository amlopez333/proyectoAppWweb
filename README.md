# proyectoAppsWeb
proyecto de aplicaciones web
Para instalar las dependencias nada mas hay que hacer 
>npm install

## GIT
* [Formato de commits](http://udacity.github.io/git-styleguide/)

## Consideraciones importantes
1. Olman, vuelva a correr npm install. Ya ahí puse babel-preset-react y lo que ocupamos para MongoDB. 
2. Mae, una vez que haya instalado MongoDB y lo tenga corriendo, es nada más de hacer tres tablas, una que se llama `users`, otra que se llama `buys` y otra que se llama `sells`. Apenas pueda le paso un script con datos para poblar esa base de una. Para más info de [MongoDB](https://docs.mongodb.com/manual/installation/?_ga=2.6662325.666629545.1500355352-1173324507.1500355352)
3. Para correr el server nada más haga 
   >npm start.
5. En la carpeta models se ve el esquema para cada una de nuestras tablas (portafolio no es una tabla pero le hice un Schema porque así se puede manejar como un Embedded Document Array, más de eso en la documentación de [Mongoose](http://mongoosejs.com/docs/2.7.x/docs/embedded-documents.html)
4. En la carpeta `src` es donde vamos a poner todos nuestros componentes de `React`.  En la carpeta `dist` es donde va a ir todo el `HTML` y el `bundle.js`. Ahí tiene que ir el `index.html`. Ya no ocupa utilizar lo del `create-react-app` para correr `webpack-dev-server`. Solamente ocupa correr el script.
   En Linux
   >.\webpackdevserver.sh

   En Winhoes
   >wepackdevserver.bat
5. Más adelante vamos a dejar de utilizar `webpack-dev-server` porque vamos a conectar con el Backend (`server.js`). Esto seguro ya para martes en la tarde. Para crear el `bundle.js` a pata corra el commmando
   >npm run devbuild

## USO
1. Ejecutar 
   >npm install
2. Ejecutar
   >npm start 

### Rutas
`post(/login, function(req, rest, next))`
Autentica al usuario. En el cuerpo del `(req)` de la solicitud debe venir el email y contraseña.

`post(/register, function(req, rest, next))`
Registra un usuario. En el cuerpo del `(req)` de la solicitud debe venir todo lo especificado por el esquema en `models/user.js`.

`post(/buy/:userId, function(req, rest, next))`
Compra una acción. Como parámetro del `(req)` debe venir el userId. En el cuerpo del `(req)` de la solicitud debe venir todo lo especificado por el esquema en `models/buy.js`.

`post(/sell/:userId, function(req, rest, next))`
Vende una acción. Como parámetro del `(req)` debe venir el userId. En el cuerpo `(req)` de la solicitud debe venir todo lo especificado por el esquema en `models/sell.js` y debe venir el `id` del ítem específico a vender del portafolio.

`get(/portafolios/:userId, function(req, rest, next))`
Retorna el contenido del portafolio de dicho usuario. Como parámetro del `(req)` debe venir el userId. 
   