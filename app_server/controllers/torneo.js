const mongoose = require('mongoose');

require('../models/db');
require('../models/torneo');
require('../models/equipo');
require('../models/fecha');

//creo el modelo a partir del scheme para poder trabajar
const torneosModel = mongoose.model('torneosModel');
const equiposModel = mongoose.model('equiposModel');
const fechasModel = mongoose.model('fechasModel');
const partidosModel = mongoose.model('partidosModel');

const index = function (req, res) {

	var torneoID = req.params.id;
	torneosModel.findById(torneoID,function(err, torneo){
		if(err){
			//en caso de error
			res.render('error', { error : err });
		}
		else{
			equiposModel.find({torneo: torneo.nombre}).sort({Pts:-1})
			.populate('jugadores').exec((err, equipos) => {
				if (err) {
					//en caso de error
					res.render('error', { error : err });
				}
				else{
					fechasModel.find({torneo: torneo.nombre}).sort({_id:1})
						.populate('partidos').exec((err, fechas) => {
						if(err){
							//en caso de error
							res.render('error', {error:err});
						}
						else{
							//paso la view y un objeto
							res.render('torneo',
							{
								title: torneo.nombre,
								torneo: torneo,
								equipos: equipos,
								fechas: fechas
							});
							}
					})
				}
			})//exec equipos
		}
	})

	}//corchete find torneos




module.exports = { index }
