"use strict";

const tablaNumeros = () => {
	let cuerpo = document.body;
	let tabla = '<table class="tabla">';
	let contador = 1;
	for (let i = 0; i < 10; i++) {
		tabla += "<tr>";
		for (let j = 0; j < 10; j++) {
			tabla += `<td>${contador++}</td>`;
		}
		tabla += "</tr>";
	}
	tabla += "</table>";
	cuerpo.innerHTML += tabla;
};

const pintarPrimos = () => {
	let tabla = document.getElementsByTagName("table");
	console.log(tabla);
};

export { tablaNumeros, pintarPrimos };
