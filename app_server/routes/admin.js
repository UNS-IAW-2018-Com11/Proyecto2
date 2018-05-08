var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var keys = require('../config/keys');

/* GET admin page. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

//DESPUES HACER CON UN CONTROLLER
router.post('/insert', function(req, res, next){
  var torneoNuevo = {
    nombre: req.body.tname,
    formato:req.body.format,
    cantTeams:req.body.teams,
    cantPlayers:req.body.maxp,
    estado: 'activo'
  }

  mongo.connect(keys.mongo.dbURI, function(err, database){
    assert.equal(null,err);

    const db = database.db('torneos');
    db.collection('torneosmodels').insertOne(torneoNuevo, function(err, result){
      assert.equal(null,err);
      database.close();
    });
  });

  //redirect to add-teams
  res.redirect('/add-teams/?nombre='+req.body.tname);
});

module.exports = router;
