var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var keys = require('../config/keys');

const ctrlTeams = require('../controllers/add-teams');
/* GET home page. */
router.get('/', ctrlTeams.view);

//const ctrlTeamsDB = require('../controllers/teams-insert');
//router.post('/', ctrlTeamsDB.db);

router.post('/', function(req, res, next){
  //req.body => objeto JSON

  var equipoNuevo = {
  	nombre: req.body.nombre,
  	GP:0,
  	W:0,
  	L:0,
  	PF:0,
  	PC:0,
  	Pts:0,
  	torneo:req.body.torneo,
  	jugadores:req.body.jugadores
  };

  console.log(req.body.jugadores);


  //insert players
  mongo.connect(keys.mongo.dbURI, function(err, database){
    assert.equal(null,err);//chequeo errores
    const db = database.db('torneos');
    db.collection("jugadoresmodels").insertMany(req.body.jugadores, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      database.close();
      //insert teams
      mongo.connect(keys.mongo.dbURI, function(err, database){
        assert.equal(null,err);//chequeo errores
        const db = database.db('torneos');
        db.collection('equiposmodels').insertOne(equipoNuevo, function(err, result){
          assert.equal(null,err);
          database.close();
        });
      });
    });
  });

  res.status(200).end();

});

module.exports = router;
