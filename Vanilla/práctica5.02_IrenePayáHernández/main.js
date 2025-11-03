"use strict";
import {
	crearAcordeon,
	mostrarContenido,
	contarPosicion,
} from "./biblioteca/ejercicio1.js";

import { contenidoPestana } from "./biblioteca/ejercicio2.js";
window.onload = () => {
	//Cogemos todos los div código.
	const div = document.getElementsByTagName("div");
	//recogemos los que nos interesan, en este caso el de la posición 0 corresponde al acordeón y el de la posición al contendor de los tabs.
	const acordeon = div[0];
	const tabs = div[1];
	
	//Creamos el acordeón mediante una función, le pasamos por parámetro cuantas secciones va a tener.
	crearAcordeon(acordeon, 3);

	//Cuando se haga clic sobre el contenedor, si se ha hecho sobre el título de la sección aparecerá el contenido.
	acordeon.addEventListener(
		"click",
		(evento) => {
			//Utilizamos esta función para ver en que posición está el elemento seleccionado, se puede hacer más facil con un query selector en realidad.
			let posicion = contarPosicion(evento.target);
			//Con ?? no funciona por lo que he usado el operador &&.
			//Si es impar se ejecuta la función.
			posicion % 2 !== 0 && mostrarContenido(evento.target.nextElementSibling);
		},
		false
	);

	//Si al hacer clic sobre el contenedor de tabs estamos seleccionando un botón, se ejecutará la función que hará que cambien las clases de los párrafos para mostrar el contenido correcto.
	tabs.addEventListener("click", (evento) => {
		evento.target.tagName === "BUTTON" && contenidoPestana(evento.target);
		
	});
}; //fin onload
