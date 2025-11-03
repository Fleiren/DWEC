"use strict";

const crearLienzo = (celdas) => {
	const lienzo = document.getElementsByClassName("lienzo")[0];
	const tabla = document.createElement("table");
	for (let i = 0; i < celdas; i++) {
		const tr = document.createElement("tr");
		tabla.appendChild(tr);
		for (let j = 0; j < celdas; j++) {
			const td = document.createElement("td");
			tr.appendChild(td);
		}
	}

	lienzo.appendChild(tabla);
};

const agregarBoton = (nombre, elemento) => {
	const boton = document.createElement("button");
	boton.innerText = nombre;
	elemento.appendChild(boton);
};

const insertarColores = () => {
	const colores = document.getElementsByClassName("colores")[0];
	const clasesColores = [
		"blanco",
		"rojo",
		"azul",
		"verde",
		"negro",
		"amarillo",
	];
	for (let i = 0; i < clasesColores.length; i++) {
		const div = document.createElement("div");
		div.classList.add(clasesColores[i]);
		colores.appendChild(div);
	}

	const libre = document.createElement("div");
	const aleatorio = document.createElement("input");
	aleatorio.type = "color";
	aleatorio.value = "000000";
	aleatorio.classList.add("aleatorio");
	colores.appendChild(aleatorio);
};

export { crearLienzo, insertarColores, agregarBoton };
