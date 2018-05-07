const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/torneos');
require('../models/db');
require('../models/torneo');

//creo el modelo a partir del scheme para poder trabajar
const torneos = mongoose.model('torneosModel');

const index = function (req, res) { 
	torneos.find().exec((err, torneo) => {
    if (err) { 
		//en caso de error
		res.render('error', { error : err });    
    }else {
		//paso la view y un objeto
		res.render('index', 
		{
			title: 'Torneos Activos',
			torneos: torneo
		});
    }
	})
};

module.exports = { index }