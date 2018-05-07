// Rutas de la aplicación

exports.login = function(req, res){
  // Renderiza la plantilla 'index' cuando en el navegador
  // nos encontremos en la raiz '/' --> http://localhost:puerto/
  res.render('user/login', {
    // Enviamos como variables un título
    // y objeto 'user' que contiene toda
    // la información del usuario y viaja en el 'request'
    title: 'Ejemplo de Passport JS',
    user: req.user
  });
};


var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  // Renderiza la plantilla 'index' cuando en el navegador
  // nos encontremos en la raiz '/' --> http://localhost:puerto/
  res.render('user/login', {
    // Enviamos como variables un título
    // y objeto 'user' que contiene toda
    // la información del usuario y viaja en el 'request'
    title: 'Ejemplo de Passport JS',
    user: req.user
  });
});

module.exports = router;