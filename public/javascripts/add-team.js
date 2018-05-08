function confirm_team(nombre_torneo){
  //nombre del equipo
  var equipo;
  $('#formequipo input').each(function() {
		var input = $(this);
		equipo = input.val();
	});

  //obtengo los jugadores
  var jugador = {
    nombre:'',
    DNI:'',
    edad: 0,
  }

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

  $('#modalForm input').each(
			function() {
				var input = $(this);
				switch (input.attr('name')) {
				case "fname":
					jugador.nombre = input.val();
					break;
				case "dni":
					jugador.dni = input.val();
					break;
				case "edad":
					edad = input.val();
          jugador.edad = edad;
          json_equipo.jugadores.push(jugador);
				}
			});
      console.log(json_equipo);
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

}
