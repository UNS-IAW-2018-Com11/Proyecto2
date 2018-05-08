function confirm_team(){

  //nombre del equipo aparentemente
  var equipo;
  $('#formequipo input').each(function() {
		var input = $(this);
		equipo = input.val();
	});
  console.log(equipo);
  //obtengo los jugadores aparentemente
  var jugador = '';
  $('#modalForm input').each(
			function() {
				var input = $(this);
				switch (input.attr('name')) {
				case "fname":
					jugador = '{ "nombre":"' + input.val() + '",';
					break;
				case "dni":
					jugador += '"DNI":"' + input.val() + '",';
					break;
				case "edad":
					jugador += '"edad":' + input.val() + ' }';
          console.log(jugador);
			//		json_equipos.equipo[index_equipo].jugador.push(JSON
				//			.parse(jugador));
				}
			});

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
