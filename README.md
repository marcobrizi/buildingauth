# buildingauth
Authentication Service for building

Questo modulo espone tre semplici servizi per l'autenticazione di dispositivi di domotica.

Quick start
-----------

```javascript
var buildingauth = require('buildingauth');

buildingauth.authenticate('username','password',function(err){
  if (err instanceof Error) {
    throw err;
  }
  console.log('Authenticated!');
});

```
