var mongoose = require('mongoose');

var keys = require('../config/keys');

mongoose.connect(keys.mongo.dbURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Conectado a la base de datos.');
});