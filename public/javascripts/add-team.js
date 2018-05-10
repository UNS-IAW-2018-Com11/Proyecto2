function confirm_team(){
  //nombre del equipo
  var nombre_torneo = document.getElementById('torneo_nombre').innerHTML;
  nombre_torneo = nombre_torneo.trim();

  var equipo;
  $('#formequipo input').each(function() {
    var input = $(this);
    equipo = input.val();
});


  var json_equipo = {
    nombre:equipo,
    GP:0,
    W:0,
    L:0,
    PF:0,
    PC:0,
    Pts:0,
    torneo: nombre_torneo,
    jugadores:[]
  };

  var divsjugador = document.getElementsByClassName("jugador");

  var arrayJugadores = Array.prototype.slice.call(divsjugador);

  arrayJugadores.forEach(function(player)
  {

      var jugador = {
        nombre:'',
        DNI:'',
        edad: 0,
      };
      var inputs = player.getElementsByTagName("input");
      var inputList = Array.prototype.slice.call(inputs);
      inputList.forEach(function(input){

          switch (input.name){
            case "fname":{
            jugador.nombre = input.value;
            }
            break;
            case "dni":
            jugador.DNI = input.value;
            break;
            case "edad":
            jugador.edad = input.value;
          }

      });
      json_equipo.jugadores.push(jugador);
    });

    console.log(json_equipo);


    // construct an HTTP request
    var xhr = new XMLHttpRequest();

    var URL = '/add-teams';
    xhr.open('POST', URL, true);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(json_equipo));

    closeAfterConfirm(equipo);
  }

  function closeAfterConfirm(equipo){
    $('#mymodal').modal('hide');

    var listaEquipos = document.getElementById("lista_equipos");

    var items = listaEquipos.childNodes;
    var listo = true;
    var todos = false;
    for (var i = 0; i < items.length && listo; i++) {

      //If the node is an element node, the nodeType property will return 1.
      if (items[i].nodeType === 1) {
        //
        if (items[i].innerHTML === 'Add New Team<span class="badge badge-primary badge-pill" data-toggle="modal" data-target="#mymodal">+</span>') {
          items[i].innerHTML = '<a>' + equipo + '</a>';
          listo = false;
        }
        else{
          todos = true;
        }
      }
    }

    if(todos){
      var doc = document.getElementById("botonSave");
      doc.innerHTML = '<button type="button" class="btn btn-primary" onclick="insertTeams()">Save</button>';
    }
  }

  function insertTeams(){
    // construct an HTTP request
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() { // listen for state changes
      if (xhr.readyState == 4 && xhr.status == 200) { // when completed we can move away
        window.location = "/";
      }
    }

    var URL = '/add-teams/insert-schedule';
    xhr.open('POST', URL, true);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send data
    xhr.send('');
  }
