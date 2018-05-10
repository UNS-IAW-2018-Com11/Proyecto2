var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var keys = require('../config/keys');

const index = function(req, res){
	var torneo = [];
	var equipos = [];
	var fechas = [];

	mongo.connect(keys.mongo.dbURI, function(err, db) {
		if (err) throw err;
    var dbo = db.db("torneos");
		dbo.collection("torneosmodels").find({nombre: req.params.id}).toArray(function(err, result) {
			if (err) throw err;
			torneo = result;
			dbo.collection("equiposmodels").find({torneo: req.params.id}).toArray(function(err, result) {
				if (err) throw err;
				equipos = result;
				dbo.collection("fechasmodels").find({torneo: req.params.id}).toArray(function(err, result) {
					if (err) throw err;
					fechas = result;
					db.close();
					res.render('torneo', {
						title: torneo[0].nombre,
						torneo: torneo[0],
						equipos: equipos,
						fechas: fechas
					});
				});
			});
		});
  });
}

module.exports = { index }
