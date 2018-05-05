var torneosModel = require('../models/torneo');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/torneos');

var torneos = [
 new torneosModel({
  nombre: 'torneo1',
  formato: 'liga',
  cantTeams: 5,
  cantPlayers: 12,
  estado: 'activo'
 }),
 new torneosModel({
  nombre: 'torneo2',
  formato: 'liga',
  cantTeams: 7,
  cantPlayers: 12,
  estado: 'activo'
 }),
 new torneosModel({
  nombre: 'torneo3',
  formato: 'liga',
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