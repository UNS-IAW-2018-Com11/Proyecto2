var torneosModel = require('../models/torneo');

var mongoose = require('mongoose');
var keys = require('../config/keys');

mongoose.connect(keys.mongo.dbURI);

var torneos = [
 new torneosModel({
  nombre: 'LAB - Division 1',
  formato: 'Liga',
  cantTeams: 4,
  cantPlayers: 12,
  estado: 'activo'
 }),
 new torneosModel({
  nombre: 'LAB - Division 2',
  formato: 'Liga',
  cantTeams: 7,
  cantPlayers: 12,
  estado: 'activo'
 }),
 new torneosModel({
  nombre: 'Copa Empleados de Comercio 2018',
  formato: 'Liga',
  cantTeams: 9,
  cantPlayers: 12,
  estado: 'activo'
 })
];

var done = 0;

for(var i = 0; i < torneos.length; i++){
 torneos[i].save(function(err,result){
  done++;
  if(done === torneos.length){
   exit();
  }
 });
}

function exit(){
 mongoose.disconnect();
}
