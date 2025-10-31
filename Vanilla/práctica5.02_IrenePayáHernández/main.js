"use strict";
import {
	crearAcordeon,
	mostrarContenido,
	contarPosicion,
} from "./biblioteca/ejercicio1.js";

import { contenidoPestana } from "./biblioteca/ejercicio2.js";
window.onload = () => {
	const div = document.getElementsByName("div");
	const acordeon = div[0];
	const tabs = div[1];
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

	tabs.addEventListener("click", (evento) => {
		contenidoPestana(evento.target);
	});
}; //fin onload
