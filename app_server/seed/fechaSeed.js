var fechasModel = require('../models/fecha');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/torneos');

var fechas = [
	new fechasModel(
	{
		local:'pichicheeen',
		visitante:'dollar blue',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'10-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'hot potatoes',
		visitante:'wd40',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'10-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'wd40',
		visitante:'pichicheeen',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'17-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'dollar blue',
		visitante:'hot potatoes',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'17-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'wd40',
		visitante:'dollar blue',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'24-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'hot potatoes',
		visitante:'pichicheeen',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'24-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'pichicheeen',
		visitante:'dollar blue',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'10-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'hot potatoes',
		visitante:'wd40',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'10-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'wd40',
		visitante:'pichicheeen',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'17-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'dollar blue',
		visitante:'hot potatoes',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'17-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'wd40',
		visitante:'dollar blue',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'24-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	}),
	new fechasModel(
	{
		local:'hot potatoes',
		visitante:'pichicheeen',
		puntosLocal:0,
		puntosVisitante:0,
		fecha:'24-04-2018',
		estado:'pendiente',
		torneo: 'LAB - Division 1'
	})
]


var done = 0;

for(var i = 0; i < fechas.length; i++){
 fechas[i].save(function(err,result){
  done++;
  if(done === fechas.length){
   exit();
  }
 });
}

function exit(){
 mongoose.disconnect(); 
}