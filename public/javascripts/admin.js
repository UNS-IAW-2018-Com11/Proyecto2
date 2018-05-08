function decrease() {
	var num = document.getElementById("maxp").value;

	num--;

	if (num <= 12 && num >= 5)
		document.getElementById("maxp").value = num;
}

function increase() {
	var num = document.getElementById("maxp").value;

	num++;

	if (num <= 12 && num >= 5)
		document.getElementById("maxp").value = num;
}

function decreaseby2() {
	var num = document.getElementById("teams").value;

	num--;
	num--;

	if (num <= 32 && num >= 2)
		document.getElementById("teams").value = num;
}

function increaseby2() {
	var num = document.getElementById("teams").value;

	num++;
	num++;

	if (num <= 32 && num >= 2)
		document.getElementById("teams").value = num;
}

function inicializarForm() {
	document.getElementById("maxp").value = 5;
	document.getElementById("teams").value = 2;
}
