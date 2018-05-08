var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
		userName: {type: String, required:true},
		googleID: {type: String, required:true},
		power:{type: String, required:true}	
});

module.exports = mongoose.model('usersModel', schema);
