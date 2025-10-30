"use strict";
import {
	crearAcordeon,
	mostrarContenido,
	contarPosicion,
} from "./biblioteca/ejercicio1.js";

import { contenidoPestana } from "./biblioteca/ejercicio2.js";
window.onload = () => {
	const acordeon = document.getElementsByClassName("acordeon")[0];
	const pestanas = document.getElementsByClassName("pestanas")[0];
	crearAcordeon(acordeon);
	acordeon.addEventListener(
		"click",
		(evento) => {
			let posicion = contarPosicion(evento.target);
			//Con ?? no funciona por lo que he usado el operador &&.
			posicion % 2 !== 0 && mostrarContenido(evento.target.nextElementSibling);
		},
		false
	);

	pestanas.addEventListener("click", (evento) => {
		contenidoPestana(evento.target);
	});
}; //fin onload
