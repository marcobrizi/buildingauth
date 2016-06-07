# buildingauth
Authentication Service for building

Questo modulo espone tre semplici servizi per l'autenticazione di dispositivi di domotica.

Quick start
-----------

Add a user

```javascript
var auth = require('buildingauth');

auth.addUser('marco','passwd','marco.brizi@gmail.com', function(err) {
  //do some stuff
});
```

Get user info

```javascript
var auth = require('buildingauth');

auth.getUserInfo('marco', function(err,user){
  //the user object like {username:'username',email:'e.mail@mail.com'}
});
```

Authenticate
```javascript
var auth = require('buildingauth');

auth.authenticate('marco','passwd',function(err, result){
  //result return true if user is authenticated
});
```
