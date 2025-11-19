"use strict";
import {
	validarCampo,
	validarFormulario,
	añadirErrores,
	fechaActual,
	obtenerInputs,
	crearDiscoJSON,
	guardarDisco,
	mostrarDiscos
} from "./biblioteca/biblioteca.js";
window.onload = () => {
	const formularioDisco = document.forms.agregarDisco;
	//Obtenemos todos los elementos interactuables del formulario para aplicar de forma más comoda los elementos div de error (Podría haberlos puesto directamente en el html la verdad).
	const inputs = obtenerInputs(formularioDisco);
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
			if (evento.target.id === "guardar") {
				if (validarFormulario(formularioDisco)) {
					guardarDisco(crearDiscoJSON(formularioDisco));
					formularioDisco.reset();
				}
			}
		},
		false
	);
}; //fin de window onload.
