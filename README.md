# proyectoAppsWeb
proyecto de aplicaciones web
Para instalar las dependencias nada mas hay que hacer 
>npm install

## GIT
* [Formato de commits](http://udacity.github.io/git-styleguide/)

## Dependencias externas
1. Necesita tener instalado `NodeJS >=v4.x.x`
2. Necesita tener `MongoDB` instalado
3. La estructura de la base de datos es la siguiente
   ```javascript
   1. users: {  
         name: {type: String, required: true, trim: true},  
         lastName: {type: String, required: true, trim: true},  
         ssn: {type: String, required: true, trim: true},  
         email: {type: String, required: true, trim: true},  
         password: {type: String, required: true, trim: true},  
         accountType: {type: String, required: true},  
         accountNumber: {type: String, required: true},  
         currentCashBalance: {type: Number, required: true},  
         portfolio: [{  
           _id: {type: Schema.Types.ObjectId, required: true},  
           ticker: String,  
           name: String,  
           price: Number,  
           dateBought: {type: Date, default: Date.now},  
           amount: Number  
         }]  
      }
   
   2. buys: {  
         userId: {type: Schema.Types.ObjectId, required: true},  
         ticker: {type: String, required: true},  
         name: {type: String, required: true},  
         price: {type: Number, required: true},  
         date: {type: Date, default: Date.now},  
         amount: {type: Number, required: true}  
      }
   
   3. sells: {
         userId: {type: Schema.Types.ObjectId, required: true},
         ticker: {type: String, required: true},
         name: {type: String, required: true},
         price: {type: Number, required: true},
         date: {type: Date, default: Date.now},
         amount: {type: Number, required: true}
      }
   ```
   Este Schema es basado en el Schema de Mongoose. A la hora de crear las tablas en MongoDB no es necesario crear el esquema. 
   El mapeo de este Schema se puede encontrar en `models`.
4. La dirección de la base de datos es `mongodb://localhost/daquantrader` por defecto. En caso que esté en otra dirección esta se debe especificar 
como variable de ambiente:  
   
   En Linux:  
   >export DB=[`mongodb://hostaddress/dbname`]

   En Windows:
   >setx DB=[`mongodb://hostaddress/dbname`]

##Uso
1. Ejecutar `mongod`. Este se encuentra en el directorio donde haya instalado 'MongoDB' en Windows. En linux basta con ejecutar `sudo mongod`.
2. Ejecutar `npm install` para instalar las dependencias.
3. Ejecutar `npm start` para iniciar el servidor.  
   Este escucha en la dirección `127.0.0.1:3000` por defecto. Para cambiar la dirección se debe especifar `IP` y `PORT` como variables de ambiente:

   En Linux:  
   >export PORT=[`desiredport`]
   >export IP=[`desiredip`]
   
   En Windows:
   >setx PORT=[`desiredport`]
   >setx IP=[`desiredip`]

## Compilación

1. Si está en ambiente de desarrollo, ejecutar `npm run devbuild`.
2. Si está en ambiente de producción, ejecutar `npm run build`.

## ESTA PARTE NO LA INCLUYA

2. Mae, una vez que haya instalado MongoDB y lo tenga corriendo, es nada más de crear una base que se llame `daquantrader`, hacer tres tablas, una que se llama `users`, otra que se llama `buys` y otra que se llama `sells`. Apenas pueda le paso un script con datos para poblar esa base de una. Para más info de [MongoDB](https://docs.mongodb.com/manual/installation/?_ga=2.6662325.666629545.1500355352-1173324507.1500355352)
Inserte los siguientes datos en db.users.insert()

  { _id : ObjectId("596de5f4946bf6c3fb2fd999"), name : "Andy", lastName : "L
opez", ssn : "115690009", email : "amlopez333@gmail.com", password : "pruebasHayqueHasg", accountType : "Roth IRA", accountNumber : "001-5602-789643", curr
entCashBalance : 1000000, portfolio : [ { _id : ObjectId("596de5f5946bf6c3f
b2fd99a"), ticker : "FB", name : "Facebook Inc.", price : 123.46, dateBou
ght : ISODate("2017-07-18T10:41:57.240Z"), amount : 60 }, { _id : ObjectId(
"596efe5d5b66fdfae1c55f38"), ticker : "MSFT", name : "Microsoft", price :
56.15, dateBought : ISODate("2017-07-19T06:38:21.872Z"), amount : 35 } ] }

## FIN PARTE que no hay que incluir. Lo de rutas si.

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
   