var equiposModel = require('../models/equipo');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/torneos');

var equipos = [
	new equiposModel(
	{
		nombre:'pichicheeen',
		GP:0,
		W:0,
		L:0,
		PF:0,
		PC:0,
		Pts:0,
		torneo: 'LAB - Division 1'
	}),
	new equiposModel({
		nombre:'dollar blue',
		GP:0,
		W:0,
		L:0,
		PF:0,
		PC:0,
		Pts:0,
		torneo: 'LAB - Division 1'
	}),
	new equiposModel({
		nombre:'hot potatoes',
		GP:0,
		W:0,
		L:0,
		PF:0,
		PC:0,
		Pts:0,
		torneo: 'LAB - Division 1'
	}),
	new equiposModel({
		nombre:'wd40',
		GP:0,
		W:0,
		L:0,
		PF:0,
		PC:0,
		Pts:0,
		torneo: 'LAB - Division 1'
	})
]



var done = 0;

for(var i = 0; i < equipos.length; i++){
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