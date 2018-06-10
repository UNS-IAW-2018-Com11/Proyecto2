var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var keys = require('../config/keys');
var nombre_torneo;

const ctrlTeams = require('../controllers/add-teams');
/* GET home page. */
router.get('/', ctrlTeams.view);

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

  nombre_torneo = req.body.torneo;

  //insert players
  mongo.connect(keys.mongo.dbURI, function(err, database){
    assert.equal(null,err);//chequeo errores
    const db = database.db('torneos');
    db.collection("jugadoresmodels").insertMany(req.body.jugadores, function(err, res) {
      if (err) throw err;
      //insert teams
        assert.equal(null,err);//chequeo errores
        const db = database.db('torneos');
        db.collection('equiposmodels').insertOne(equipoNuevo, function(err, result){
          assert.equal(null,err);
          database.close();
        });

    });
  });
  res.status(200).end();

});

router.post('/insert-schedule', function(req, res, next){
  var equipos = [];
  mongo.connect(keys.mongo.dbURI, function(err, db) {
    if (err) throw err;
    var dbo = db.db("torneos");
    dbo.collection("equiposmodels").find({torneo: nombre_torneo}).toArray(function(err, result) {
      if (err) throw err;
      //db.close();
      for(var i = 0; i < result.length; i++){
        equipos[i]=result[i].nombre;
      }
      //CREDITOS: https://github.com/clux/roundrobin +10 fav y reco
      var robin = require('roundrobin');
      var schedule = robin(equipos.length, equipos);
      //en schedule tengo la matriz de partidos
      //falta insertarlos en la BD
      console.log(schedule);
      var fechas = insert_scheduleDB(schedule, equipos, db);

      assert.equal(null,err);//chequeo errores
      const dbo = db.db('torneos');
      dbo.collection("fechasmodels").insertMany(fechas, function(err, res) {
        if (err) throw err;
        db.close();
      });
    });
  });

  res.status(200).end();

});

function insert_scheduleDB(schedule, equipos){
  //schedule es la matriz donde cada fila es una fecha y las columnas los partidos. A su vez cada partido es un arreglo de 2 elementos. [local , visitante]
  var fechas = [];
  for(var i=0; i < schedule.length; i++){ //por cada fecha:
    var partidos = [];
    for(var j=0; j < schedule[i].length; j++){ // por cada partido de la fecha
      var partido = {
        local: schedule[i][j][0],
        visitante: schedule[i][j][1],
        puntosLocal:0,
        puntosVisitante:0,
        estado:'pendiente'
      };
      partidos.push(partido);
    }//end for j
    var fecha = {
      fecha: i+1,
      torneo: nombre_torneo,
      partidos:partidos
    };
    fechas.push(fecha);
  }//end for i
  //ya tengo el objeto listo para pushear a la BD ('fechas')
  console.log(fechas);
  return fechas;
}

module.exports = router;
