"use strict";
import {
	cargarPiezas,
	crearTablero,
	comprobarCeldasLlenas,
	comprobarOrden,
	cargarImagenes,
} from "./biblioteca/biblioteca.js";
window.onload = () => {
	//pillar las imagenes en array

	cargarPiezas(cargarImagenes(9));
	crearTablero(9);
	const piezas = document.getElementsByClassName("piezas")[0];
	const tablero = document.getElementsByClassName("tablero")[0];

	piezas.addEventListener(
		"dragstart",
		(evento) => {
			if (evento.target.classList.contains("arrastrable")) {
				evento.dataTransfer.setData("id", evento.target.id);
			}
		},
		false
	);

	tablero.addEventListener(
		"dragover",
		(evento) => {
			evento.preventDefault();
		},
		false
	);

	tablero.addEventListener(
		"drop",
		(evento) => {
			if (
				evento.target.classList.contains("soltable") &&
				evento.target.children.length === 0
			) {
				evento.preventDefault();
				const pieza = document.getElementById(
					evento.dataTransfer.getData("id")
				);
				evento.target.appendChild(pieza);
			}
			if (comprobarCeldasLlenas(tablero) === tablero.children.length) {
				comprobarOrden(tablero) ? console.log("bien") : console.log("mal");
			}
		},
		false
	);
}; //fin de window.onload.
