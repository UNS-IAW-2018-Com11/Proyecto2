//hasta que no requiera este archivo en app.js para que se ejecute, si intento acceder a /auth/google va a dar unknown strategy google


var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var keys = require('./keys');
require('../models/user');
const mongoose = require('mongoose');
const usersModel = mongoose.model('usersModel');

//ac�, user es el documento/record/tabla que se guarda en la db de mongo, que tiene un _id si o si siempre.
passport.serializeUser((user,done) => {
	//el done guarda el _id en una cookie
	done(null,user.id); //null va en el lugar del parametro error, pero 100% seguro q no hay error aca.
});

//cuando vuelve la cookie, tomamos la id que se guardo antes.
passport.deserializeUser((id,done) => {
	usersModel.findById(id).then((user) =>{
		done(null,user);
	});
});

//despues que se ejecuta esto, el "passport" va a tener en toda la app lo que se le agrego con el .use
//tal cual en app.js se le agrega el metodo helper al handlebar y se usa en todos lados
passport.use(new GoogleStrategy({
	// options for  the google strat
	callbackURL: '/auth/google/redirect',
	clientID: keys.google.clientID,
	clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
	// Estas en el callback DE PASSPORT (no de google)
	//en el cmd se puede ver toda la info y los campos q trae profile
	console.log(profile);

	//veo si el user ya existe en la db
	//find es asincronico, el then espera que termine y luego ejecuta
	usersModel.findOne({googleID: profile.id}).then((currentUser) =>{
		if(currentUser){
			//ya esta el user en la db
			console.log('el usuario es: '+currentUser);
			done(null, currentUser);
		}else{
			//no esta el user en la db, lo creo
			//save es asincronico, el then espera que termine y luego ejecuta
			new usersModel({
				userName: profile.displayName,
				googleID: profile.id,
				power: 'user'
			}).save().then((newUser) => {
				console.log('se creo el user: '+newUser);
				done(null, newUser);
			});
			//cualquiera de los 2 done de aca arriba una vez hechos van al metodo serializeUser de passport

		}//cierra else

	});

})

)
