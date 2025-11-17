"use strict";
import { campoValido } from "./biblioteca/utilFormularios.js";
//He dividido los métodos generales para cualquier formulario y para los específicos en dos archivos JavaScript diferentes.
const patrones = {
	nombre: /.{5,}/,
	grupo: /.{5,}/,
	anyo: /\d{4}/,
	localizacion: /^[A-Z]{2}-\d{3}[A-Z]{2}$/,
};

const obtenerPatron = (nombre) => {
	//Prefiero trabajar con null pero creo que para el uso que le voy a dar en realidad da igual.
	return patrones.nombre !== undefined ? patrones.nombre : null;
};

const validarCampo = (campo) => {
	let patron = obtenerPatron(campo.name);
	//Esta función es genérica y se encarga de mandar el elemento a la validación correspondiente según el tipo de campo (si es con patrón).
	if (patron) {
		campoValido(campo, patron);
	} else {
		//Si no se valida con patrón (porque no lo validamos) valido de forma genérica con otra función general que no esté vacío si es required.
		validarCampoRequired(campo);
	}
};

export { validarCampo };
