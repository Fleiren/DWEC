"use strict";
const patrones = {
	nombre: /.{5,}/,
	caratula: /^https?:\/\//,
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
	let valido = true;
	if (campo) {
		let nombreCampo = campo.name;
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
	return campo !== "" && validarPatron(campo, patron);
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
	return campo !== "" && validarPatron(campo, patron);
};

/**
 * Valida el campo año.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarAnyo = (campo) => {
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
	return campo !== "";
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
	let valido = true;
	if (valor !== "") valido = patron.test(valor);
	return valido;
};

/**
 * Devuelve el objeto bien formateado, añadiendo la id.
 * @param {Object} formulario
 * @returns {Object}
 */
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

/**
 * Devuelve la lista de discos filtrada buscando coincidencias con el string que se ha pasado por parámetro.
 * @param {string} dato
 * @param {Array} discos
 * @returns {Array}
 */
const buscarDisco = (dato, discos) => {
	let resultado = [];
	resultado = discos.filter(
		(disco) =>
			disco.nombre === dato ||
			disco.genero === dato ||
			disco.localizacion === dato ||
			disco.anyo === dato ||
			disco.grupo === dato
	);
	return resultado;
};

/**
 * Eliminar de la lista el disco con la id que se pasa por parámetro.
 * @param {string} id
 * @param {Array} discos
 * @returns {Array}
 */
const eliminarDiscoPorId = (id, discos) => {
	//Hacer a mano.
	window.confirm("¿Estás seguro de que quieres eliminar el disco?") &&
		(discos = discos.filter((disco) => disco.id !== id));
	return discos;
};

/**
 * Busca el disco con la id pasada por parámetro.
 * @param {string} id
 * @param {Array} discos
 * @returns {Object}
 */
const buscarDiscoId = (id, discos) => {
	return discos.find((disco) => {
		return disco.id === id;
	});
};
export {
	validarCampo,
	crearDiscoJSON,
	validarNombre,
	validarAnyo,
	validarCaratula,
	validarGenero,
	validarGrupo,
	validarLocalizacion,
	buscarDisco,
	eliminarDiscoPorId,
	buscarDiscoId,
};
