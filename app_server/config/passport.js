var mongoose = require('mongoose');
require('../models/user');
var User = mongoose.model('User');

// Estrategia de autenticación con Facebook
var FacebookStrategy = require('passport-facebook').Strategy;

// Fichero de configuración donde se encuentran las API keys
var config = require('./config');

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
module.exports = function(passport) {

//este metodo le dice a passport como guardar un user en la sesión
	passport.serializeUser(function(user, done){ //el done callback se ejecuta cuando passport termine
		done(null, user.id); //err = null - le digo a passport: cuando quieras guardar un usuario en la sesion, serializalo por id
	});

	passport.deserializeUser(function(id,done){
		User.findById(id, function(err,user){
			done(err,user);		
		});	
	});


	// Configuracion 
	passport.use('facebook',new FacebookStrategy({
		clientID			: config.id,
		clientSecret	: config.secret,
		callbackURL	 : config.callback
	}, function(accessToken, refreshToken, profile, done) {

	
		User.findOne({id: profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user);

			// Si el usuario ya existe lo devuelve
			// y si no, lo crea y salva en la base de datos
			var user = new User({

				power: 'user',
				id: profile.id,
				access_token: accessToken,
				firstName: givenName,
				lastName: familyName,
				email: profile.emails[0].value
				
			});
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));

};