var mongoose = require('mongoose');

const dbURI = process.env.MLAB_URI;

mongoose.connect(dbURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Conectado a la base de datos.');
});