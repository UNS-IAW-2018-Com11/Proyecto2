const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/torneos');

require('../models/torneo');
require('../models/equipo');

//creo el modelo a partir del scheme para poder trabajar
const torneos = mongoose.model('torneosModel');
const equipos = mongoose.model('equiposModel');

const index = function (req, res) {
	
	var torneoID = req.params.id;
		
	torneos.findById(torneoID, function(err, torneos){
		if (err) { 
			//en caso de error
			res.render('error', { error : err });    
		}else {		
			equipos.find({},function(err, equipos){
				if (err) { 
					//en caso de error
					res.render('error', { error : err });    
				}else {				
					//paso la view y un objeto	
					res.render('torneo', 
					{	
						title: torneos.nombre,
						torneos: torneos,
						equipos: equipos
					});
				}	
			})		
		}	
	})	
};

module.exports = { index }