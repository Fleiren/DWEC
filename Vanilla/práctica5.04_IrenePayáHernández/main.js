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
	//Me apetecía poner liarme un poco y he hecho niveles, no puedo evitar probar cosas, obvio sin IA (no tendría gracia), menos para una expresión regular y algunas cosas del css.
	const imagenesNivel = [
		cargarImagenes(9, "./img/facil/"),
		cargarImagenes(12, "./img/medio/"),
		cargarImagenes(20, "./img/dificil/"),
		cargarImagenes(20, "./img/maestro/"),
	];

	//Se inicia con el nivel base que es lo que nos pides en la práctica.
	cargarPiezas(cargarImagenes(9, "./img/facil/"));
	crearTablero(9);
	const niveles = document.getElementsByClassName("niveles")[0];
	const piezas = document.getElementsByClassName("piezas")[0];
	const tablero = document.getElementsByClassName("tablero")[0];
	const boton = document.getElementsByClassName("boton")[0];
	//Hacer lo de los niveles me ha venido muy bien para practicar y trastear los addEventListener.
	niveles.addEventListener(
		"click",
		(evento) => {
			//Esto lo he hecho así para no tener una condición por nivel y que se puedan añadir niveles de forma fácil.
			let idBoton = evento.target.id;
			//Esta expresión te devuelve un array de los números que encuentra en un string.
			let nivel = idBoton.match(/\d+/g)[0];
			if (nivel >= 0 && nivel < imagenesNivel.length) {
				//Vaciamos el tablero para que no se acumulen las piezas de un puzle sobre otro.
				vaciarTableroYPiezas(tablero, piezas);
				//Si por lo que sea añadimos más de 9 niveles, hay que sacar el nombre de la clase de otra manera porque el substring solo quita el primer carácter.
				piezas.classList = `piezas ${idBoton.substring(1, idBoton.length)}`;
				tablero.classList = `tablero ${idBoton.substring(1, idBoton.length)}`;
				//Se cargan las piezas y se genera el tablero con el tamaño correcto según el nivel elegido
				if(nivel === "3") document.getElementById("titulo").innerHTML = `Puzzles<br>(¡Se puede hacer, yo lo he hecho!)`;
				cargarPiezas(imagenesNivel[nivel]);
				crearTablero(imagenesNivel[nivel].length);
			}
		},
		false
	);

	//Inicio el evento dragstart en el bloque de las piezas, si es arrastrable, se guarda en dataTransfer la id.
	piezas.addEventListener(
		"dragstart",
		(evento) => {
			if (evento.target.classList.contains("arrastrable")) {
				evento.dataTransfer.setData("id", evento.target.id);
			}
		},
		false
	);

	//Para que funcione el drop tengo que indicar al contenedor que no haga su función por defecto al hacer el dragover.
	piezas.addEventListener(
		"dragover",
		(evento) => {
			evento.preventDefault();
		},
		false
	);

	//Al soltar la pieza en el contenedor de piezas (aunque sea en una pieza) se añade al contenedor de las piezas.
	piezas.addEventListener("drop", (evento) => {
		if (evento.target.classList.contains("soltable")) {
			evento.preventDefault();
			//Recuperamos la id de la pieza gracias a dataTransfer.
			const pieza = document.getElementById(evento.dataTransfer.getData("id"));
			piezas.appendChild(pieza);
		}
	});

	//Iniciamos el evento dragstart en el tablero y guardamos la id en dataTransfer.
	tablero.addEventListener("dragstart", (evento) => {
		if (evento.target.classList.contains("arrastrable")) {
			evento.dataTransfer.setData("id", evento.target.id);
		}
	});

	//Quitamos la función por defecto también para el tablero.
	tablero.addEventListener(
		"dragover",
		(evento) => {
			evento.preventDefault();
		},
		false
	);

	//Al soltar la pieza sobre el tablero se añade en la casilla solo si está vacía.
	tablero.addEventListener(
		"drop",
		(evento) => {
			//Hay que asegurarse de que se suelta en una casilla que no tiene pieza y que no sea una imagen ya que las imágenes también son soltables.
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
			//Si ya todas las celdas están ocupadas se comprueba si el orden es correcto.
			if (comprobarCeldasLlenas(tablero) === tablero.children.length) {
				const mensaje = document.getElementById("resultado");
				//Si el orden no es correcto no mostramos mensaje.
				if (comprobarOrden(tablero)) mensaje.innerHTML = "¡Has ganado!";
					
			}
		},
		false
	);


	//Cuando le damos al botón de reiniciar se vacía el tablero y se devuelven las piezas al contenedor de piezas.
	boton.addEventListener(
		"click",
		(evento) => {
			if (evento.target.tagName === "BUTTON") {
				vaciarTablero();
				//Vaciamos el mensaje de resultado al reiniciar.
				document.getElementById("resultado").innerHTML = "";
			}
		},
		false
	);
}; //fin de window.onload.
