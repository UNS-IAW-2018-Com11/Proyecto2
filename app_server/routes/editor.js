var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var keys = require('../config/keys');

router.get('/', function(req, res, next) {
  mongo.connect(keys.mongo.dbURI, function(err, db) {
    if (err) throw err;
    var dbo = db.db("torneos");

    dbo.collection("torneosmodels").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      //console.log(result);
      res.render('editor',{
        torneos: result
      });
    });
  });
  //res.render('editor');
});

router.get('/:id', function(req, res, next) {
  mongo.connect(keys.mongo.dbURI, function(err, db) {
    if (err) throw err;
    var dbo = db.db("torneos");

    dbo.collection("fechasmodels").find({'torneo': req.params.id}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      //console.log(result);
      res.render('editor',{
        fechas: result
      });
    });
  });
});

router.post('/update', function(req, res, next){

  mongo.connect(keys.mongo.dbURI, function(err, db) {
    if (err) throw err;
    var dbo = db.db("torneos");
    /*"fecha": 1,
   "partidos": [
       {
           "local": "Falcones",
           "visitante": "Dents",
           "puntosLocal": 0,
           "puntosVisitante": 0,
           "estado": "pendiente"
       }
    ]*/
    console.log(req.body.fecha);
    //{$set:{"fecha": 999}}

    dbo.collection("fechasmodels").findOne({"fecha": req.body.fecha}, function(err, res) {
      if (err) console.log(err);
      console.log(res);
      db.close();
    });
  });

  res.status(200).send();
  //redirect
  //res.redirect('/add-teams/?nombre='+req.body.tname);
});

module.exports = router;
