const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/torneos');

require('../models/db');

const user = function (req, res) { 
	var messages = req.flash('error');
	res.render('user/signup', {csrfToken: req.csrfToken(), messages : messages, hasErrors: messages.length > 0});
};


const redir = function (req,res){
	res.redirect('/');	
};

module.exports = { user,redir }