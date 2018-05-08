var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jugadorSchema = new Schema({
	nombre: {type: String, required:true},
	DNI: {type: String, required:true},
	edad: {type: Number, required:true}
});

var jugadoresModel = mongoose.model('jugadoresModel', jugadorSchema);

var equipoSchema = new Schema({
	nombre: {type: String, required:true},
	GP:{type: Number, required:true},
	W:{type: Number, required:true},
	L:{type: Number, required:true},
	PF:{type: Number, required:true},
	PC:{type: Number, required:true},
	Pts:{type: Number, required:true},
	torneo:{type: String, required:true},
	jugadores:[{type: Schema.Types.ObjectId, ref: 'jugadoresModel'}]
});

var equiposModel = mongoose.model('equiposModel', equipoSchema);

module.exports = {
	equiposModel: equiposModel,
	jugadoresModel: jugadoresModel
}
