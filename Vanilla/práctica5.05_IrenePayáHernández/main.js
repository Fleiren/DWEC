"use strict";
import {
	fechaActual,
	validarFormulario, 
	eliminarElementos,
	obtenerInputs
} from "./biblioteca/utilFormularios.js";
import { validarCampo, 
	obtenerErrores, 
	añadirErrores
 } from "./biblioteca/biblioteca.js";
window.onload = () => {
	const anyo = document.getElementById("inputAnyo");
	const formularioDisco = document.forms.agregarDisco;
	const inputs = obtenerInputs(formularioDisco);
	const errores = obtenerErrores();
	//Coloco el año actual como máximo.
	fechaActual(anyo);
	añadirErrores(inputs);
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
				let elementosFormulario = formularioDisco.elements;
				//He diseñado este método con la posibilidad de que se quiera mostrar los errores o no, no se me ocurría otra forma de validar y mostrar los errores en dos métodos distintos sin validar dos veces.
				//Había pensado devolver un array con los errores pero me parecía más lioso.
				//Creo que tiene demasiados parámetros de entrada.
				let valido = validarFormulario(elementosFormulario,errores, "mensajeError");
				if(valido){
					let mensajes = document.getElementsByClassName("mensajeError");
					eliminarElementos(mensajes);
					
				}
			}
		},
		false
	);
}; //fin de window onload.
