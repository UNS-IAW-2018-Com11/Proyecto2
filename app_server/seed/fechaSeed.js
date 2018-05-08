var models = require('../models/fecha');
var mongoose = require('mongoose');
var keys = require('../config/keys');

mongoose.connect(keys.mongo.dbURI);

var fechas = [
	new models.fechasModel(
	{
		fecha:'10-04-2018',
		torneo: 'LAB - Division 1',
		partidos: [
				 new models.partidosModel({
					local:'pichicheeen',
					visitante:'dollar blue',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					}),
					new models.partidosModel({
					local:'hot potatoes',
					visitante:'wd40',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					})
					]
	}),
	new models.fechasModel(
	{
		fecha:'17-04-2018',
		torneo: 'LAB - Division 1',
		partidos: [
					new models.partidosModel({
					local:'wd40',
					visitante:'pichicheeen',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					}),
					new models.partidosModel({
					local:'dollar blue',
					visitante:'hot potatoes',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					})
					]
	}),
	new models.fechasModel(
	{
		fecha:'24-04-2018',
		torneo: 'LAB - Division 1',
		partidos: [
					new models.partidosModel({
					local:'wd40',
					visitante:'dollar blue',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					}),
					new models.partidosModel({
					local:'hot potatoes',
					visitante:'pichicheeen',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					})
					]
	}),
	new models.fechasModel(
	{
		fecha:'30-04-2018',
		torneo: 'LAB - Division 1',
		partidos: [
					new models.partidosModel({
					local:'dollar blue',
					visitante:'pichicheeen',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					}),
					new models.partidosModel({
					local:'wd40',
					visitante:'hot potatoes',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					})
					]
	}),
	new models.fechasModel(
	{
		fecha:'04-05-2018',
		torneo: 'LAB - Division 1',
		partidos: [
					new models.partidosModel({
					local:'pichicheeen',
					visitante:'wd40',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
										}),
					new models.partidosModel({
					local:'hot potatoes',
					visitante:'dollar blue',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					})
					]
	}),
	new models.fechasModel(
	{
		fecha:'07-05-2018',
		torneo: 'LAB - Division 1',
		partidos: [ new models.partidosModel({
					local:'dollar blue',
					visitante:'wd40',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					}),
					new models.partidosModel({
					local:'pichicheeen',
					visitante:'hot potatoes',
					puntosLocal:0,
					puntosVisitante:0,
					estado:'pendiente'
					})
					]
	})
];

var done = 0;

for(var i = 0; i < fechas.length; i++){
	for(var j = 0; j< fechas[i].partidos.length; j++){
		fechas[i].partidos[j].save();
 	}
	fechas[i].save(function(err,result){
	  	done++;
  		if(done === fechas.length){
   		exit();
		}});
}

function exit(){
 mongoose.disconnect();
}
