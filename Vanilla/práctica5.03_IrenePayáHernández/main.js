"use strict";
import {
	crearLienzo,
	insertarColores,
	agregarBoton,
} from "./biblioteca/biblioteca.js";
window.onload = () => {
	crearLienzo(60);
	insertarColores();
	const lienzo = document.getElementsByClassName("lienzo")[0];
	agregarBoton("limpiar", lienzo);
	const paleta = document.getElementsByClassName("colores")[0];
	const celdas = Array.from(lienzo.getElementsByTagName("td"));
	let pintar = false;
	let color = "blanco";
	lienzo.addEventListener(
		"mousedown",
		(evento) => {
			console.log(evento.target.tagName);

			if (evento.target.tagName === "TD") {
				pintar = true;
				evento.target.classList = color;
			}
			if (evento.target.tagName === "BUTTON") {
				celdas.forEach((celda) => {
					celda.classList = "blanco";
				});
			}
		},
		false
	);

	lienzo.addEventListener(
		"mouseup",
		() => {
			pintar = false;
		},
		false
	);

	lienzo.addEventListener(
		"mouseover",
		(evento) => {
			if (pintar && evento.target.tagName === "TD") {
				evento.target.classList = color;
			}
		},
		false
	);

	paleta.addEventListener(
		"click",
		(evento) => {
			color = evento.target.classList[0];
			console.log(color);
		},
		false
	);
}; //fin de windows.onload
