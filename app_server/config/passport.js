var passport = require('passport'); //passport tambien está setado en el js App, pero si importo passport en archivos distintos, la configuracion que haga en uno se mantiene en los demas, no es que hay muchas instancias sino siempre la misma
var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;

//este metodo le dice a passport como guardar un user en la sesión
passport.serializeUser(function(user, done){ //el done callback se ejecuta cuando passport termine
	done(null, user.id); //err = null - le digo a passport: cuando quieras guardar un usuario en la sesion, serializalo por id
});

passport.deserializeUser(function(id,done){
	User.findById(id, function(err,user){
		done(err,user);		
	});	
});

passport.use('facebook.signup', new FacebookStrategy({
		clientID        : '2038875279719668',
        clientSecret    : 'b18c8293524fbec137f22a0cff4a88d4',
		callbackURL : 'http://localhost:3000/auth/facebook/callback'	
}, function(access_token, refresh_token, profile, done){
	
	process.nextTick(function() {
	
	User.findOne({'id':profile.id}, function(err,user){
		if(err){
			return done(err);
		}
		if (user){
			return done(null, false, {message: 'Ese facebook ya esta registrado.'});
		}		
		var newUser = new User();
		 newUser.facebook.id    = profile.id; 
	     newUser.facebook.access_token = access_token; 
	     newUser.facebook.firstName  = profile.name.givenName;
	     newUser.facebook.lastName = profile.name.familyName; 
		 newUser.facebook.email = profile.emails[0].value; 
		
		
		newUser.save(function(err,result){
			if (err){
				return done(err);
			}
			return done(null, newUser);
		});
	});
	
	});
}));