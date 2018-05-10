var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var keys = require('../config/keys');

const index = function(req, res){
  var equipo;
	mongo.connect(keys.mongo.dbURI, function(err, db) {
		if (err) throw err;
    var dbo = db.db("torneos");

		dbo.collection("equiposmodels").find({nombre: req.params.id}).toArray(function(err, result) {
			if (err) throw err;
      equipo = result;
      db.close();
      res.render('equipo',{
        equipo: equipo.nombre,
        jugadores:  equipo.jugadores
      });
		});
  });

}
module.exports = { index }
