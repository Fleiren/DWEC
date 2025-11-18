"use strict";

const fechaActual = (elementoAnyo) => {
	if (elementoAnyo.tagName === "INPUT" || elementoAnyo.type === "number") {
		const hoy = new Date();
		elementoAnyo.max = hoy.getFullYear();
	}
};

const obtenerInputs = (formulario) => {
	 let elementos = formulario.elements;
	 let inputs = [];
	 for (let i = 0; i < elementos.length; i++) {
		if(elementos[i].tagName === "INPUT" || elementos[i].tagName === "SELECT"){
			inputs = [...inputs, elementos[i]];
		}
	 }

	 return inputs;
}
//Manda el campo a la función de validación correspondiente, valida solo los campos necesarios para la práctica pero para que funcione bien en cualquier formulario debo añadir más casos en el switch.
const campoValido = (campo, patron) => {
	let valido = true;
	let etiqueta = campo.tagName;
	if (etiqueta === "INPUT" && patron) {
		let tipo = campo.type;
		//No se porque he usado switch en lugar de if else, ¿es mejor práctica usar uno u otro?
		switch (tipo) {
			case "number":
				valido = validarNumero(campo, patron);
				break;
			case "text":
				valido = validarInputText(campo, patron);
				break;
			default:
				valido = false;
				break;	
		}
	} else {
		valido = validarCampoGenerico(campo);
	}
	return valido;
};

//Valida de forma generica los campos required y refuerza la validación.
const validarCampoGenerico = (campo) => {
	let valido = true;
	if(campo.required && campo.value === "") valido = false;
	//Añado validación del propio input para reforzar la validación.
	//Suponía que de alguna forma se podía acceder a las validaciones propias del input de alguna manera y como no encontraba nada (y soy cabezona) le he preguntado a la IA si se podía y me ha enseñado el método validity de los inputs.
	//Es difícil de encontrar porque cuando haces console.log hay muchas propiedades, es una locura.
	//Supongo que cuantas más cosas se puedan validar mejor.
	if(campo.value !== "" && !campo.validity.valid) valido = false;
	return valido;
}

const validarFormulario = (elementosFormulario, errores = null, nombreClaseError) => {
	let valido = true;
	if(!elementosFormulario) valido = false;
	for (let i = 0; i < elementosFormulario.length; i++) {
		if(elementosFormulario[i].tagName === "INPUT" || elementosFormulario[i].tagName === "SELECT"){
			if(!campoValido(elementosFormulario[i])){
				valido = false;
				if(errores){
					console.log("hola");
					mostrarError(elementosFormulario[i], errores, nombreClaseError);
				}
			}

		}
	}
	return valido;
	
}

const mostrarError = (elementoError, errores, nombreClaseError) => {
	//Muestra el mensaje de error bajo el input que da error (el diseño de donde se muestra el error, haciéndolo con div debajo de cada input se lo he copiado a Álvaro porque me ha gustado como quedaba).
	
	
}

const eliminarElementos = (mensajes) => {
	
	if(mensajes){
		let mensajesArray = Array.from(mensajes);
		for (let mensaje of mensajesArray) {
			mensaje.remove();
		}
	}
}
const validarInputText = (campo, patron) => {
	let valido = patron.test(campo.value);
	return valido;
};

const validarNumero = (campo, patron) => {
	let valido = true;
	//Paso el valor a entero porque lo obtengo en formato string del formulario.
	let valor = parseInt(campo.value);
	//Si no es un número da error (En realidad ya lo controla el propio input lo de si es un número o no pero mejor volver a validar y no fiarse).
	isNaN(valor) ? valido = false : valido = patron.test(campo.value);
	return valido;
};



export { fechaActual, campoValido, validarCampoGenerico, validarFormulario, eliminarElementos, obtenerInputs };
