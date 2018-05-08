const mongoose = require('mongoose');
require('../models/db');

require('../models/equipo');

//creo el modelo a partir del scheme para poder trabajar
const equiposModel = mongoose.model('equiposModel');
const jugadoresModel = mongoose.model('jugadoresModel');

const db = function (req, res) {
/*
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
	})*/

	}//corchete find torneos

module.exports = { db }
