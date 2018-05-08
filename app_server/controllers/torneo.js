var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var keys = require('../config/keys');

const index = function (req, res) {

	var equipos = [];
	var torneo = [];

	//obtengo torneo con el id de la url
	mongo.connect(keys.mongo.dbURI, function(err, database){
		assert.equal(null,err);
		const db = database.db('torneos');
		//recupero el torneo con el id pasado por url
		var cursor = db.collection('torneosmodels').find({nombre: req.params.id});
		cursor.forEach(function(doc, err){
			assert.equal(null, err);
			torneo.push(doc);//push current item
		}, function(){
			database.close;
			console.log(torneo[0]);
			//obtengo coleccion equipos con el nombre del torneo
			mongo.connect(keys.mongo.dbURI, function(err, database){
				//console.log('ID: '+req.params.id);
				assert.equal(null,err);
				const db = database.db('torneos');
				var cursor = db.collection('equiposmodels').find({torneo: torneo[0].nombre});

				cursor.forEach(function(doc, err){
					assert.equal(null, err);
					equipos.push(doc);//push current item
				}, function(){
					database.close;
					res.render('torneo', {
						title: torneo[0].nombre,
						torneo: torneo[0],
						equipos: equipos,
						fechas: {}
					});
				})
			});//fin mongo.connect
		})
	});//fin mongo.connect
};

module.exports = { index }
