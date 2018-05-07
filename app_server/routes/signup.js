var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrf());

const ctrlSignup = require('../controllers/signup');

/* GET signup page. */
router.get('/', ctrlSignup.user); 

router.post('/', passport.authenticate('facebook.signup', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signup',
	failureFlash:true
	
}));

router.get('/user/profile', function(req,res,next){
	res.render('user/profile');
});

module.exports = router;
