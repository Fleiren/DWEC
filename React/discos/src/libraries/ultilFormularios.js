"use strict";
const patrones = {
	nombre: /.{5,}/,
	caratula: /^https?:\/\//, //No me iba por lo de escapar las barras (En la práctica dice que no es necesario validarlo pero por probar las expresiones lo he hecho).
	grupo: /.{5,}/,
	anyo: /\d{4}/,
	localizacion: /^ES-\d{3}[A-Z]{2}$/,
};

/**
 * Devuelve el año actual
 * @returns {Number}
 */
const fechaActual = () => {
	const hoy = new Date();
	return hoy.getFullYear();
};

/**
 * Recibe un campo y lo valida, es específico para el fomulario de los discos.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarCampo = (campo) => {
	//Este método lo utilizo para hacer las validaciones instantaneas, es el método que se activa en los eventos input y change.
	let valido = true;
	if (campo) {
		let nombreCampo = campo.name;
		//He usado un switch porque pienso que no lo usamos nunca y que para varias opciones como en este caso es para lo que está diseñado ¿Es así? es que no lo uso nunca.
		switch (nombreCampo) {
			case "nombre":
				valido = validarNombre(campo.value);
				break;
			case "caratula":
				valido = validarCaratula(campo.value);
				break;
			case "grupo":
				valido = validarGrupo(campo.value);
				break;
			case "anyo":
				valido = validarAnyo(campo.value);
				break;
			case "genero":
				valido = validarGenero(campo.value);
				break;
			case "localizacion":
				valido = validarLocalizacion(campo.value);
				break;
			default:
				valido = false;
				break;
		}
	}
	return valido;
};


/**
 * Valida el campo nombre.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarNombre = (campo) => {
	let patron = patrones.nombre;
	//Con dos métodos extraigo código que se iba a repetir en todos los métodos siguientes.
	return campo!=="" && validarPatron(campo, patron);
};

/**
 * Valida el campo carátula.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarCaratula = (campo) => {
	let patron = patrones.caratula;
	return validarPatron(campo, patron);
};

/**
 * Valida el campo grupo/intérprete.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarGrupo = (campo) => {
	let patron = patrones.grupo;
	return campo!=="" && validarPatron(campo, patron);
};

/**
 * Valida el campo año.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarAnyo = (campo) => {
	//Esta validación no ha quedado bien al final por el problema que he mencionado antes.
	let valido = true;
	let patron = patrones.anyo;

	if (campo !== "") {
		const valor = parseInt(campo);
		if (isNaN(valor)) valido = false;
		if (!validarPatron(campo, patron)) valido = false;
		if (valor > fechaActual() || valor < 1850) valido = false;
	}

	return valido;
};

/**
 * Valida el campo género musical.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarGenero = (campo) => {
	//Este no tiene patrón ya que no se valida mediante patrón, con la validación básica nos sobra.
	return campo !=="";
};

/**
 * Valida el campo localización.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarLocalizacion = (campo) => {
	let patron = patrones.localizacion;
	return validarPatron(campo, patron);
};

/**
 * Valida si el string pasado por parámetro cumple el patrón.
 * @param {string} valor
 * @param {RegExp} patron
 * @returns
 */
const validarPatron = (valor, patron) => {
	//Si el valor está vacío se da como válido porque los campos opcionales no deben dar error si se comprueba el patrón estando vacíos, por ello se hace antes una validación básica comprobando si pueden o no estar vacíos.
	//Solo se comprueba el patrón si el campo tiene contenido ya que si llega hasta aquí vacío se entiende que es por ser opcional.
	let valido = true;
	if (valor !== "") valido = patron.test(valor);
	return valido;
};

const crearDiscoJSON = (formulario) => {
	//Generamos la id.
	let idDisco = crypto.randomUUID();
	return {
		id: idDisco,
		nombre: formulario.nombre,
		caratula: formulario.caratula,
		grupo: formulario.grupo,
		anyo: formulario.anyo,
		genero: formulario.genero,
		localizacion: formulario.localizacion,
		prestado: formulario.prestado,
	};
};

export { validarCampo, crearDiscoJSON, validarNombre,
	validarAnyo,
	validarCaratula,
	validarGenero,
	validarGrupo,
	validarLocalizacion };
