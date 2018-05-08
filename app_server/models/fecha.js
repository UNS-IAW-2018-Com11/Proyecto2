var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partidoSchema = new Schema({
	local: {type: String, required:true},
	visitante: {type: String, required:true},
	puntosLocal:{type: Number, required:true},
	puntosVisitante:{type: Number, required:true},
	estado:{type: String, required:true}
});

var partidosModel = mongoose.model('partidosModel', partidoSchema);


var fechaSchema = new Schema({
	fecha:{type: String, required:true},
	torneo:{type: String, required:true},
	partidos:[ {type: Schema.Types.ObjectId, ref: 'partidosModel'}]
});

var fechasModel = mongoose.model('fechasModel', fechaSchema);


module.exports = {
	fechasModel: fechasModel,
	partidosModel: partidosModel
}
