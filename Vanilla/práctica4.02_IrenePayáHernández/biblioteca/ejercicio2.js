"use strict";
import { esPrimo } from "./util.js";

const tablaNumeros = () => {
	//Coloco la tabla dentro de un contenedor para poder modificar con css todo más comodo.
	let contenedor = document.createElement('div');
	contenedor.classList.add("contenedorTabla")
	let tabla = '<h1>Tabla</h1><table class="tabla">';
	let contador = 1;
	for (let i = 0; i < 10; i++) {
		tabla += "<tr>";
		for (let j = 0; j < 10; j++) {
			tabla += `<td>${contador++}</td>`;
		}
		tabla += "</tr>";
	}
	tabla += "</table>";
	contenedor.innerHTML = tabla;
	document.body.appendChild(contenedor);
}

const pintarPrimos = () => {
	let tabla = document.getElementsByTagName("table")[0];
	console.log(tabla);
	let celdas = tabla.getElementsByTagName("td");
	for (let celda of celdas){
		//el contenido de cada celda es texto por lo que debemos convertirlo a enteros antes de calcular si es primo.
		let num = parseInt(celda.textContent);
		//Compruebo que sea un número y que sea primo.
		if(!isNaN(num) && esPrimo(num)){
			//Gracias a classList añadimos la clase esPrimo a esa celda
			celda.classList.add("esPrimo");
		}
	}
}

export { tablaNumeros, pintarPrimos };
