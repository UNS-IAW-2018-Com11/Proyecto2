var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	nombre: {type: String, required:true},
	GP:{type: Number, required:true},
	W:{type: Number, required:true},
	L:{type: Number, required:true},
	PF:{type: Number, required:true},
	PC:{type: Number, required:true},
	Pts:{type: Number, required:true},
	torneo:{type: String, required:true}
});

module.exports = mongoose.model('equiposModel', schema);