"use strict";
import {
	crearLienzo,
	insertarColores,
	agregarBoton,
	rangoColor,
} from "./biblioteca/biblioteca.js";
window.onload = () => {
	//Creo el lienzo indicando que sea de 60x60.
	crearLienzo(60);
	//Inserto los colores base.
	insertarColores();
	//Recojo los contenedores para añadir los eventos, las celdas y el input para añadir el evento a la elección de un color preciso.
	const lienzo = document.getElementsByClassName("lienzo")[0];
	agregarBoton("limpiar", lienzo);
	const paleta = document.getElementsByClassName("colores")[0];
	const celdas = Array.from(lienzo.getElementsByTagName("td"));
	const inputPreciso = document.getElementsByClassName("preciso")[0];
	//Declaro las variables necesarias para saber si el usuario está pintando, saber que color está usando y si es un color preciso.
	let pintar = false;
	let color = "blanco";
	let libre = false;
	//Para los colores precisos es mucho mejor en google chrome, en firefox solo salen unos cuantos colores para elegir.
	//Cuando el usuario presiona el lienzo comienza a pintar, la variable pintar será true.
	lienzo.addEventListener(
		"mousedown",
		(evento) => {
			//Si no usa estilo libre, el color se le añade por clase, ya que será un color base.
			if (evento.target.tagName === "TD" && !libre) {
				pintar = true;
				evento.target.classList = color;
			}
			//Si usa estilo libre, el color se le añade con estilo en linea ya que no hay otra manera de hacerlo.
			if (evento.target.tagName === "TD" && libre) {
				pintar = true;
				evento.target.style.backgroundColor = color;
			}
			//Si le da al botón, todas las celdas se pintan de blanco y se elimina cualquier estilo en línea (aquí es donde necesito todas las celdas).
			if (evento.target.tagName === "BUTTON") {
				celdas.forEach((celda) => {
					celda.classList = "blanco";
					celda.style.backgroundColor = "";
				});
			}
		},
		false
	);

	//Cuando el usuario deje de presionar el botón izquierdo del ratón la variable pintar será false ya que termina el proceso de pintar.
	document.addEventListener(
		"mouseup",
		() => {
			pintar = false;
		},
		false
	);

	//Cuando el ratón pase por encima de las celdas, si el usuario no ha dejado de presionar el botón, la variable pintar será true, por lo que se pintarán las celdas por las que pase.
	lienzo.addEventListener(
		"mouseover",
		(evento) => {
			if (pintar && evento.target.tagName === "TD" && !libre) {
				//Quitamos el color del estilo en linea porque si tenía alguno no se pintará de nuevo usando un color base.
				evento.target.style.backgroundColor = "";
				evento.target.classList = color;
			}
			if (pintar && evento.target.tagName === "TD" && libre) {
				evento.target.style.backgroundColor = color;
			}
		},
		false
	);

	//Cuando el usuario hace click en algún div de los colores base para seleccionar un color, se guarda el color seleccionado.
	paleta.addEventListener(
		"click",
		(evento) => {
			if (evento.target.classList.contains("color")) {
				//Como ha seleccionado un color base, la variable libre se vuelve false.
				libre = false;
				color = evento.target.classList[0];
				//Mostramos el color seleccionado.
				document.getElementById("colorUsado").innerHTML = `${color}`;
			}

			//Si el usuario ha pulsado en el input de elegir un color preciso, entonces la variable libre será true, pero aún no mostramos el color porque se motrará el anterior seleccionado.
			if (evento.target.tagName === "INPUT") {
				libre = true;
			}
		},
		false
	);

	//Gracias al evento change podemos guardar el color que elige el usuario de forma aleatoria ya que si guardo el color cuando hace click o mousedown en el input se guarda el color anterior
	//porque interactuar con el desplegable de colores no es interactuar con el input por lo que este evento lo que hace es guardar el color cuando detecta que se cambia.
	inputPreciso.addEventListener(
		"change",
		(evento) => {
			libre = true;
			color = evento.target.value;
			document.getElementById("colorUsado").innerHTML = rangoColor(color);
		},
		false
	);
}; //fin de windows.onload.
