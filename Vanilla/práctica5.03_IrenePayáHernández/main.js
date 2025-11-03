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
	let libre = false;
	lienzo.addEventListener(
		"mousedown",
		(evento) => {
			if (evento.target.tagName === "TD" && !libre) {
				pintar = true;
				evento.target.classList = color;
			}
			if (evento.target.tagName === "TD" && libre) {
				pintar = true;
				//En el caso de un color aleatorio debo coger el color aquí porque es cuando ya se ha cambiado el valor del input, si lo hago al hacer click se guarda el valor anterior.
				color = document.getElementsByClassName("aleatorio")[0].value;
				evento.target.style.backgroundColor = color;
			}
			if (evento.target.tagName === "BUTTON") {
				celdas.forEach((celda) => {
					celda.classList = "blanco";
					celda.style.backgroundColor = "";
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
			if (pintar && evento.target.tagName === "TD" && !libre) {
				evento.target.classList = color;
			}
			if (pintar && evento.target.tagName === "TD" && libre) {
				evento.target.style.backgroundColor = color;
			}
		},
		false
	);

	paleta.addEventListener(
		"click",
		(evento) => {
			if (evento.target.tagName === "DIV") {
				libre = false;
				color = evento.target.classList[0];
			}
			if (evento.target.tagName === "INPUT") {
				libre = true;
			}
		},
		false
	);
}; //fin de windows.onload
