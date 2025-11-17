"use strict";
import {
	fechaActual,
	validarFormulario,
	mostrarErrores,
} from "./biblioteca/utilFormularios.js";
import { validarCampo } from "./biblioteca/biblioteca.js";
window.onload = () => {
	const anyo = document.getElementById("inputAnyo");
	const formularioDisco = document.forms.agregarDisco;
	const elementoError = document.getElementById("error");
	//Coloco el año actual como máximo.
	fechaActual(anyo);
	//Lo he separado en dos eventos porque los select no funcionan bien con input y si pongo los input en el evento change se ponene en rojo cuando pierden el foco y no es lo que quiero.
	formularioDisco.addEventListener(
		"input",
		(evento) => {
			if (evento.target.tagName === "INPUT") {
				validarCampo(evento.target)
					? evento.target.classList.remove("error")
					: evento.target.classList.add("error");
			}
		},
		false
	);
	formularioDisco.addEventListener(
		"change",
		(evento) => {
			if (evento.target.tagName === "SELECT") {
				//Le colocamos la clase de error si no es válido.
				validarCampo(evento.target)
					? evento.target.classList.remove("error")
					: evento.target.classList.add("error");
			}
		},
		false
	);
	formularioDisco.addEventListener(
		"click",
		(evento) => {
			if (evento.target.tagName === "BUTTON") {
				//Actua no se porque como un submit aunque no lo sea.
				evento.preventDefault();
				//Reviso que todos los campos obligatorios tengan valor y sean válidos.
				let campos = formularioDisco.elements;
				let errores = validarFormulario(campos);
				//Si no hay erroes vacío el mensaje de error por si ya había alguno mostrándose.
				if (errores.length === 0) {
					elementoError.classList.add("ocultar");
				} else {
					elementoError.classList.remove("ocultar");
					mostrarErrores(errores, elementoError);
				}
			}
		},
		false
	);
}; //fin de window onload.
