"use strict";
const patrones = {
	nombre: /.{5,}/,
	caratula: /^https?:\/\//, //No me iba por lo de escapar las barras.
	grupo: /.{5,}/,
	anyo: /\d{4}/,
	localizacion: /^ES-\d{3}[A-Z]{2}$/,
};

const errores = {
	nombre: "El nombre debe tener al menos 5 caracteres.",
	caratula: "La URL de la carátula debe ser válida.",
	grupo: "El nombre del grupo / intérprete debe tener al menos 5 caracteres.",
	anyo: "El año debe ser de 4 cifras.",
	genero: "Debes seleccionar un género.",
	localizacion:
		"La localización debe tener el formato AA-123AA. (Dos letras mayúsculas, guión medio, tres números y dos letras mayúsculas).",
};

const disco = {
	nombre: "",
	caratula: "",
	grupo: "",
	anyo: "",
	genero: "",
	localizacion: "",
	prestado: "",
};
const discos = [];

const fechaActual = (elementoAnyo) => {
	if (elementoAnyo.tagName === "INPUT" || elementoAnyo.type === "number") {
		const hoy = new Date();
		elementoAnyo.max = hoy.getFullYear();
	}
};
const añadirErrores = (inputs) => {
	for (let i = 0; i < inputs.length; i++) {
		//Por si acaso hay algún null.
		if (inputs[i]) {
			const div = document.createElement("div");
			div.classList.add("mensajeError", "ocultar");
			inputs[i].insertAdjacentElement("afterend", div);
		}
	}
};

const obtenerInputs = (formulario) => {
	let elementos = formulario.elements;
	let inputs = [];
	for (let i = 0; i < elementos.length; i++) {
		if (elementos[i].tagName === "INPUT" || elementos[i].tagName === "SELECT") {
			inputs = [...inputs, elementos[i]];
		}
	}

	return inputs;
};
const validarCampo = (campo) => {
	let valido = true;
	if (campo) {
		let nombreCampo = campo.name;
		//He usado un switch porque pienso que no lo usamos nunca y que para varias opciones como en este caso es para lo que está diseñado ¿Es así? es que no lo uso nunca.
		switch (nombreCampo) {
			case "nombre":
				valido = validarNombre(campo);
				break;
			case "caratula":
				valido = validarCaratula(campo);
				break;
			case "grupo":
				valido = validarGrupo(campo);
				break;
			case "anyo":
				valido = validarAnyo(campo);
				break;
			case "genero":
				valido = validarGenero(campo);
				break;
			case "localizacion":
				valido = validarLocalizacion(campo);
				break;
			default:
				valido = false;
				break;
		}
	}
	return valido;
};

const validarFormulario = (formulario) => {
	let valido = true;
	//Así evito que los errores se mantengan aunque esté bien el campo o que se acumulen.
	limpiarErrores(formulario);
	//No me gusta que se repita tanto el código, le daré vueltas si tengo tiempo ya que al tenerlo todo super generalizarlo y tener que cambiarlo ahora me hace tener tiempo justo.
	if (!validarNombre(formulario.nombre)) {
		mostrarError(formulario.nombre);
		valido = false;
	}
	if (!validarCaratula(formulario.caratula)) {
		mostrarError(formulario.caratula);
		valido = false;
	}
	if (!validarGrupo(formulario.grupo)) {
		mostrarError(formulario.grupo);
		valido = false;
	}
	if (!validarAnyo(formulario.anyo)) {
		mostrarError(formulario.anyo);
		valido = false;
	}
	if (!validarGenero(formulario.genero)) {
		mostrarError(formulario.anyo);
		valido = false;
	}
	if (!validarLocalizacion(formulario.localizacion)) {
		mostrarError(formulario.localizacion);
		valido = false;
	}
	return valido;
};

//No me convence esto de tanto método con prácticamente lo mismo... ¿luego los métodos se generalizan un poco de alguna manera en la vida real no?
const validarNombre = (campo) => {
	let valido = true;
	let patron = patrones.nombre;

	//Me aseguro de que exista por si acaso.
	if (campo) {
		//Con dos métodos extraigo código que se iba a repetir en todos los métodos siguientes.
		valido = validarBasico(campo) && validarPatron(campo.value, patron);
	} else {
		valido = false;
	}
	return valido;
};
const validarCaratula = (campo) => {
	let valido = true;
	let patron = patrones.caratula;
	if (campo) {
		valido = validarBasico(campo) && validarPatron(campo.value, patron);
	} else {
		valido = false;
	}
	return valido;
};
const validarGrupo = (campo) => {
	let valido = true;
	let patron = patrones.grupo;
	if (campo) {
		valido = validarBasico(campo) && validarPatron(campo.value, patron);
	} else {
		valido = false;
	}
	return valido;
};
const validarAnyo = (campo) => {
	let valido = true;
	let patron = patrones.anyo;
	if (campo) {
		valido = validarBasico(campo) && validarPatron(campo.value, patron);
	} else {
		valido = false;
	}
	return valido;
};
const validarGenero = (campo) => {
	let valido = true;
	//Este no tiene patrón ya que no se valida mediante patrón, con la validación básica nos sobra.
	if (campo) {
		valido = validarBasico(campo);
	} else {
		valido = false;
	}
	return valido;
};
const validarLocalizacion = (campo) => {
	let valido = true;
	let patron = patrones.localizacion;
	if (campo) {
		valido = validarBasico(campo) && validarPatron(campo.value, patron);
	} else {
		valido = false;
	}
	return valido;
};

const validarBasico = (campo) => {
	let valido = true;
	if (campo) {
		//De forma genérica validamos lo básico, que cumpla las normas del propio elemento con validity y que si es required que contenga valor.
		if (campo.required && !campo.value) valido = false;
		//Añado validación del propio input para reforzar la validación.
		//Suponía que de alguna forma se podía acceder a las validaciones propias del input de alguna manera y como no encontraba nada (y soy cabezona) le he preguntado a la IA si se podía y me ha enseñado el método validity de los inputs.
		//Es difícil de encontrar porque cuando haces console.log hay muchas propiedades, es una locura.
		//Supongo que cuantas más cosas se puedan validar mejor.
		if (campo.value !== "" && !campo.validity.valid) valido = false;
	}

	return valido;
};

const validarPatron = (valor, patron) => {
	return patron.test(valor);
};

const mostrarError = (campo) => {
	if (campo && campo.nextSibling.classList.contains("mensajeError")) {
		let error = campo.nextSibling;
		error.classList.remove("ocultar");
		error.innerHTML = errores[campo.name];
	}
};

const limpiarErrores = (formulario) => {
	let arrayFormulario = Array.from(formulario.children);
	let divErrores = arrayFormulario.filter((elemento) =>
		elemento.classList.contains("mensajeError")
	);
	for (const div of divErrores) {
		div.classList.add("ocultar");
		div.innerHTML = "";
	}
};

const guardarDatos = (formulario) => {};

export {
	validarCampo,
	validarFormulario,
	añadirErrores,
	fechaActual,
	obtenerInputs,
};
