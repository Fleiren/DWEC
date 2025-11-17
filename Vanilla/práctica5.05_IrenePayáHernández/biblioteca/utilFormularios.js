"use strict";

const fechaActual = (elementoAnyo) => {
	if (elementoAnyo.tagName === "INPUT" || elementoAnyo.type === "number") {
		const hoy = new Date();
		elementoAnyo.max = hoy.getFullYear();
	}
};

//Manda el campo a la función de validación correspondiente.
const campoValido = (campo, patron) => {
	let valido = true;
	let etiqueta = campo.tagName;
	if (etiqueta === "INPUT") {
		let tipo = campo.type;
		switch (tipo) {
			case "number":
				valido = validarNumero(campo, patron);
				break;
			case "text":
				valido = validarInputText(campo);
			case "url":
				valido = validarUrl(campo);
		}
	} else {
	}
};

const validarFormulario = (campos) => {
	//En vez de devolver un booleano, devuelvo un array con los errores, si está vacío es porque el formulario es válido.
	let errores = [];
	for (let i = 0; i < campos.length; i++) {
		let campoActual = campos[i];
		// Validar solo si es obligatorio o tiene algún valor
		if (campoActual.required || campoActual.value !== "") {
			if (!validarCampo(campoActual)) {
				errores = [...errores, mensajeError(campoActual)];
			}
		}
	}
	return errores;
};

export { fechaActual, campoValido, validarFormulario, mostrarErrores };
