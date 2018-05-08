var models = require('../models/equipo');
var mongoose = require('mongoose');
var keys = require('../config/keys');

mongoose.connect(keys.mongo.dbURI);

var equipos = [
	new models.equiposModel(
	{
		nombre:'pichicheeen',
		GP:0,
		W:0,
		L:0,
		PF:0,
		PC:0,
		Pts:0,
		torneo: 'LAB - Division 1',
		jugadores:[
			new models.jugadoresModel({
				nombre:'jugador1',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador2',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador3',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador4',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador5',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador6',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador7',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador8',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador9',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador10',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador11',
				DNI:'35999999',
				edad: 22,
			}),
			new models.jugadoresModel({
				nombre:'jugador12',
				DNI:'35999999',
				edad: 22,
			}),
		]
	}),
	new models.equiposModel({
		nombre:'dollar blue',
		GP:0,
		W:0,
		L:0,
		PF:0,
		PC:0,
		Pts:0,
		torneo: 'LAB - Division 1'
	}),
	new models.equiposModel({
		nombre:'hot potatoes',
		GP:0,
		W:0,
		L:0,
		PF:0,
		PC:0,
		Pts:0,
		torneo: 'LAB - Division 1'
	}),
	new models.equiposModel({
		nombre:'wd40',
		GP:0,
		W:0,
		L:0,
		PF:0,
		PC:0,
		Pts:0,
		torneo: 'LAB - Division 1'
	})
];

var done = 0;

for(var i = 0; i < equipos.length; i++){
	for(var j = 0; j < equipos[i].jugadores.length; j++){
		equipos[i].jugadores[j].save();
	}
 	equipos[i].save(function(err,result){
  done++;
  if(done === equipos.length){
   exit();
  }
 });
}

function exit(){
 mongoose.disconnect();
}
