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
			console.log(evento.target.tagName);

			if (evento.target.tagName === "TD" && !libre) {
				pintar = true;
				
				evento.target.classList = color;
			}
			if(evento.target.tagName === "TD" && libre){
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
			if(evento.target.tagName === "DIV"){
				libre=false;
				color = evento.target.classList[0];
				console.log(color);
			}
			
			
		},
		false
	);

	paleta.addEventListener(
		"mouseup",
		(evento) => {
			if(evento.target.tagName === "INPUT"){
				libre = true;
				color = evento.target.value;
				console.log(color);
			}
		},
		false
	)
}; //fin de windows.onload
