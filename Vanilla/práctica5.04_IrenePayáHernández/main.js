"use strict";
import {
	cargarPiezas,
	crearTablero,
	comprobarCeldasLlenas,
	comprobarOrden,
	cargarImagenes,
	vaciarTablero,
	vaciarTableroYPiezas,
} from "./biblioteca/biblioteca.js";
window.onload = () => {
	const imagenesNivel = [
		cargarImagenes(9, "./img/facil/"),
		cargarImagenes(9, "./img/medio/"),
		cargarImagenes(9, "./img/dificil/"),
		cargarImagenes(25, "./img/maestro/"),
	];

	//Se inicia con el nivel base que es lo que nos pides en la práctica.
	cargarPiezas(cargarImagenes(9, "./img/facil/"));
	crearTablero(9);
	const niveles = document.getElementsByClassName("niveles")[0];
	const piezas = document.getElementsByClassName("piezas")[0];
	const tablero = document.getElementsByClassName("tablero")[0];
	const boton = document.getElementsByClassName("boton")[0];
	niveles.addEventListener(
		"click",
		(evento) => {
			//Esto lo he hecho así para no tener una condición por nivel y que se puedan añadir niveles de forma fácil.
			let idBoton = evento.target.id;
			let nivel = idBoton.match(/\d+/g);
			if (nivel >= 0 && nivel < imagenesNivel.length) {
				vaciarTableroYPiezas(tablero, piezas);
				piezas.classList = `piezas ${idBoton.substring(1, idBoton.length)}`;
				tablero.classList = `tablero ${idBoton.substring(1, idBoton.length)}`;
				cargarPiezas(imagenesNivel[nivel]);
				crearTablero(imagenesNivel[nivel].length);
			}
		},
		false
	);

	piezas.addEventListener(
		"dragstart",
		(evento) => {
			if (evento.target.classList.contains("arrastrable")) {
				evento.dataTransfer.setData("id", evento.target.id);
			}
		},
		false
	);

	piezas.addEventListener(
		"dragover",
		(evento) => {
			evento.preventDefault();
		},
		false
	);

	piezas.addEventListener("drop", (evento) => {
		if (evento.target.classList.contains("soltable")) {
			evento.preventDefault();
			const pieza = document.getElementById(evento.dataTransfer.getData("id"));
			piezas.appendChild(pieza);
		}
	});

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
				evento.target.tagName !== "IMG" &&
				evento.target.children.length === 0
			) {
				evento.preventDefault();
				const pieza = document.getElementById(
					evento.dataTransfer.getData("id")
				);
				evento.target.appendChild(pieza);
			}
			if (comprobarCeldasLlenas(tablero) === tablero.children.length) {
				const mensaje = document.getElementById("resultado");
				comprobarOrden(tablero)
					? (mensaje.innerHTML = "Enhorabuena.")
					: (mensaje.innerHTML = "Has perdido.");
			}
		},
		false
	);

	tablero.addEventListener("dragstart", (evento) => {
		if (evento.target.classList.contains("arrastrable")) {
			evento.dataTransfer.setData("id", evento.target.id);
		}
	});

	boton.addEventListener(
		"click",
		(evento) => {
			if (evento.target.tagName === "BUTTON") {
				vaciarTablero();
				document.getElementById("resultado").innerHTML = "";
			}
		},
		false
	);
}; //fin de window.onload.
