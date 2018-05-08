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

router.post('/insert-schedule', function(req, res, next){

  var equiposBD = [];
  //obtengo coleccion equipos con el nombre del torneo
  mongo.connect(keys.mongo.dbURI, function(err, database){
    assert.equal(null,err);
    const db = database.db('torneos');
    var cursor = db.collection('equiposmodels').find({torneo: nombre_torneo});

    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      equiposBD.push(doc);//push current item
    }, function(){
      database.close;
      var equipos = [];
      for(var i = 0; i<equiposBD.length; i++){
        equipos.push(equiposBD[i].nombre);
      }//En equipos tengo un arreglo equipos (su nombre)

      //CREDITOS: https://github.com/clux/roundrobin +10 fav y reco
      var robin = require('roundrobin');
      var schedule = robin(equipos.length, equipos);
      //en schedule tengo la matriz de partidos
      //falta insertarlos en la BD
      insert_scheduleDB(schedule, equipos);
    })
  });//fin mongo.connect

  res.status(200).end();

});

function insert_scheduleDB(schedule, equipos){
  //schedule es la matriz donde cada fila es una fecha y las columnas los partidos. A su vez cada partido es un arreglo de 2 elementos. [local , visitante]

  var fechas = [];

  for(var i=0; i < schedule.length; i++){ //por cada fecha:

    var partidos = [];

    for(var j=0; j < schedule[i].length; j++){ // por cada partido de la fecha

      console.log("schedule ");
      console.log(schedule[i][j]);
      var partido = {
        local: schedule[i][j][0],
        visitante: schedule[i][j][1],
        puntosLocal:0,
        puntosVisitante:0,
        estado:'pendiente'
      };

      partidos.push(partido);
    }//end for j

    console.log("1era vez ");
    console.log(partidos);
    var fecha = {
      fecha: i+1,
      torneo: nombre_torneo,
      partidos:partidos
    };
    console.log("2da vez");
    console.log(partidos);
    console.log("fecha");
    console.log(fecha);
    fechas.push(fecha);
  }//end for i
  //ya tengo el objeto listo para pushear a la BD ('fechas')

  console.log("fech2");
  console.log(JSON.stringify(fechas));

  //insert players
  mongo.connect(keys.mongo.dbURI, function(err, database){
    assert.equal(null,err);//chequeo errores
    const db = database.db('torneos');
    db.collection("fechasmodels").insertMany(fechas, function(err, res) {
      if (err) throw err;
      database.close();
    });
  }); //fin connect
}

module.exports = router;
