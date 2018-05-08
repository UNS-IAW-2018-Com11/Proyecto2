//const mongoose = require('mongoose');
//require('../models/db');
//require('../models/torneo');

var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var keys = require('../config/keys');

//creo el modelo a partir del scheme para poder trabajar
//const torneos = mongoose.model('torneosModel');

const view = function (req, res) {
	//obtengo el torneo en el que participan los equipos
	mongo.connect(keys.mongo.dbURI, function(err, database){
		assert.equal(null,err);
		const db = database.db('torneos');

		var cursor = db.collection('torneosmodels').find({nombre: req.query.nombre});
		var result = [];

		cursor.forEach(function(doc, err){
			assert.equal(null, err);
			result.push(doc);//push current item
		}, function(){
			db.close;
			res.render('add-teams', {
				result: result,
				torneo: req.query.nombre
			});
		})

	});
};

module.exports = { view }
