var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	nombre: {type: String, required:true},
	formato:{type: String, required:true},
	cantTeams: {type: Number, required:true},
	cantPlayers: {type: Number, required:true},
	estado:{type: String, required:true}	
});

module.exports = mongoose.model('torneosModel', schema);