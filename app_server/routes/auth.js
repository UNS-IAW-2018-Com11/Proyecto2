var express = require('express');
var router = express.Router();
var passport = require('passport');

//auth login

//render login page, /auth from app.js
router.get('/login',(req,res) => {
	res.render('login');
});

//auth with google, /auth from app.js
//cuando vaya a /auth/google, passport va a tomar el control
router.get('/google', passport.authenticate('google',{
	scope:['profile']
}));

//auth logout
router.get('/logout',(req,res) => {
	//handle with passport
	//la funcion logout es del passport
	req.logout();
	res.redirect('/contact');

});

//callback route for google to redirect to, the /auth part comes from app.js
//si no enviara el metodo authenticate a passport y solo fuera el (req,res)
//google me mandaria al redirect con el codigo y moriria ahi sin poder usarlo para conseguir la info.
//ahora cuando vuelve con el codigo como callback, es utilizado por el passport y no nos vuelve a mandaria
//a a la pantalla de login de google sino que detecta que ya pasamos por ahi (porq tenemos el codigo) y lo que hace
//es buscar la informacion
router.get('/google/redirect', passport.authenticate('google'),(req,res) => {
		//Estas en el callback DE GOOGLE  (no de passport) despues de que acepta el login con tu cuenta de google
		//Aca google te envia en el link un codigo que passport tiene que usar para recuperar los datos
		//el user que viene en el req es el user que nos da el metodo deserialize de passport desde la cookie en el passportSetup
		//res.send(req.user);
		if(req.user.power === 'admin')
			res.redirect('/admin');
		else{
			if(req.user.power === 'editor')
				res.redirect('/editor');
			else {
				res.redirect('/');
			}
		}

});


module.exports = router;
