"use strict";
import { campoValido, validarCampoGenerico } from "./utilFormularios.js";
//He dividido los métodos generales para cualquier formulario y para los específicos en dos archivos JavaScript diferentes.
const patrones = {
	nombre: /.{5,}/,
	grupo: /.{5,}/,
	anyo: /\d{4}/,
	localizacion: /^[A-Z]{2}-\d{3}[A-Z]{2}$/,
};

const errores = {
	nombre: "El nombre debe tener al menos 5 caracteres.",
	caratula: "La URL de la carátula debe ser válida.",
	grupo: "El nombre del grupo / intérprete debe tener al menos 5 caracteres.",
	anyo: "El año debe ser de 4 cifras.",
	genero: "Debes seleccionar un género.",
	localizacion: "La localización debe tener el formato AA-123AA. (Dos letras mayúsculas, guión medio, tres números y dos letras mayúsculas)."
};

const obtenerErrores = () => {
	return errores;
}

const obtenerPatron = (nombre) => {
	//Prefiero trabajar con null pero creo que para el uso que le voy a dar en realidad da igual.
	return patrones[nombre] !== undefined ? patrones[nombre] : null;
};

const añadirErrores = (inputs) => {
	for (let i = 0; i < inputs.length; i++) {
		//Por si acaso hay algún null.
		if(inputs[i]){
			const div = document.createElement("div");
			div.classList.add("mensajeError", "ocultar");
			inputs[i].insertAdjacentElement("afterend", div);
		}
		
		
	 }
}

const validarCampo = (campo) => {
	let patron = obtenerPatron(campo.name);
	let valido = true;
	//Esta función es genérica y se encarga de mandar el elemento a la validación correspondiente según el tipo de campo (si es con patrón).
	if (patron) {
		valido = campoValido(campo, patron);
	} else {
		//Si no se valida con patrón (porque no lo validamos manualmente) valido de forma genérica con otra función general que no esté vacío si es required.
		valido = validarCampoGenerico(campo);
	}
	return valido;
};



export { validarCampo, obtenerErrores, añadirErrores };
