var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
	power: {type: String, required: true},
	id: {type: String, required:true},
	access_token: {type: String, required:true},
	firstName: {type: String, required:true},
	lastName: {type: String, required:true},
	email: {type: String, required:true}		
});

/*
userSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};

userSchema.methods.validPassword = function(password){
	return bcypt.compareSync(password,this.password);	
};
*/

module.exports = mongoose.model('User', userSchema);