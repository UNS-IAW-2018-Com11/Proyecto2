var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var partidoSchema = new Schema({
	local: {type: String, required:true},
	visitante: {type: String, required:true},
	puntosLocal:{type: Number, required:true},
	puntosVisitante:{type: Number, required:true},
	fecha:{type: String, required:true},
	estado:{type: String, required:true},
	torneo:{type: String, required:true}
});

module.exports = mongoose.model('fechasModel', partidoSchema);