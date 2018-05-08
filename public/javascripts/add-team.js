function confirm_team(){

  //nombre del equipo aparentemente
  var equipo;
  $('#formequipo input').each(function() {
		var input = $(this);
		equipo = input.val();
	});

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
					json_equipos.equipo[index_equipo].jugador.push(JSON
							.parse(jugador));
				}
			});


}
