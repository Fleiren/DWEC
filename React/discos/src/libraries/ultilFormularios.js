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

/**
 * Valida el campo nombre.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarNombre = (campo) => {
	let patron = patrones.nombre;
	//Con dos métodos extraigo código que se iba a repetir en todos los métodos siguientes.
	return validarBasico(campo) && validarPatron(campo.value, patron);
};

/**
 * Valida el campo carátula.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarCaratula = (campo) => {
	let patron = patrones.caratula;
	return validarBasico(campo) && validarPatron(campo.value, patron);
};

/**
 * Valida el campo grupo/intérprete.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarGrupo = (campo) => {
	let patron = patrones.grupo;
	return validarBasico(campo) && validarPatron(campo.value, patron);
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

	//Dejo mi comentario de desesperación:
	//Curioso, para los input type number al usar validity si está vacío da error siempre sea required o no, llevo una hora sin exagerar intentando arreglarlo pero la única solución es convertir el input number en uno de tipo texto,
	//me da rabia porque si tenemos un input de tipo number es para usarlo en estos casos, si este problema tiene solución me gustaría saberlo.
	//Creo que esto ha quedado muy feo, si me da tiempo le daré otra vuelta, llevo mucho tiempo con esto y con que funcione ahora mismo me sobra.
	if (campo.value === "" && campo.required) valido = false;

	if (campo.value !== "") {
		const valor = parseInt(campo.value);
		if (isNaN(valor)) valido = false;
		if (!validarPatron(campo.value, patron)) valido = false;
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
	return validarBasico(campo);
};

/**
 * Valida el campo localización.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarLocalizacion = (campo) => {
	let patron = patrones.localizacion;
	return validarBasico(campo) && validarPatron(campo.value, patron);
};

/**
 * Hace una validación básica del campo que recibe por parámetro de entrada.
 * @param {HTMLElement} campo
 * @returns {boolean}
 */
const validarBasico = (campo) => {
	let valido = true;
	//De forma genérica validamos lo básico, que cumpla las normas del propio elemento con validity y que si es required que contenga valor.
	if (campo.required && !campo.value) valido = false;
	//Añado validación del propio input para reforzar la validación.
	//Suponía que de alguna forma se podía acceder a las validaciones propias del input de alguna manera y como no encontraba nada (y soy cabezona) le he preguntado a la IA si se podía y me ha enseñado el método validity de los inputs.
	//Es difícil de encontrar porque cuando haces console.log hay muchas propiedades, es una locura.
	//Supongo que cuantas más cosas se puedan validar mejor.
	if (campo.value !== "" && !campo.validity.valid) valido = false;
	return valido;
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

export { validarCampo };
