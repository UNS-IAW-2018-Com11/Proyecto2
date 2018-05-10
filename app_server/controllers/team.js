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
      db.close();
      res.render('equipo',{
        equipo: result[0].nombre,
        jugadores:  result[0].jugadores
      });
		});
  });

}
module.exports = { index }
