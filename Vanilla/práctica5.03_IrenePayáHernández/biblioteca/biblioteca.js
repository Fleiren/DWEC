"use strict";

/**
 * Crea un linezo con las dimensiones pasadas por parámetro
 * @param {number} celdas
 */
const crearLienzo = (celdas) => {
	const lienzo = document.getElementsByClassName("lienzo")[0];
	const tabla = document.createElement("table");
	for (let i = 0; i < celdas; i++) {
		const tr = document.createElement("tr");
		tabla.appendChild(tr);
		for (let j = 0; j < celdas; j++) {
			const td = document.createElement("td");
			tr.appendChild(td);
		}
	}

	lienzo.appendChild(tabla);
};

/**
 * Genera un botón en el componente que se le pase por parámetro con el nombre indicado.
 * @param {string} nombre
 * @param {HTMLElement} elemento
 */
const agregarBoton = (nombre, elemento) => {
	const boton = document.createElement("button");
	boton.innerText = nombre;
	elemento.appendChild(boton);
};

/**
 * Creamos la paleta de colores con los colores base y el input para elegir colores precisos (vuelvo a mencionar que el input no funciona igual en todos los navegadores).
 */
const insertarColores = () => {
	const colores = document.getElementsByClassName("colores")[0];
	const clasesColores = [
		"blanco",
		"rojo",
		"azul",
		"verde",
		"negro",
		"amarillo",
	];
	for (let i = 0; i < clasesColores.length; i++) {
		const div = document.createElement("div");
		div.classList.add(clasesColores[i], "color");
		colores.appendChild(div);
	}

	const preciso = document.createElement("input");
	preciso.type = "color";
	//Por defecto estará en color negro.
	preciso.value = "000000";
	preciso.classList.add("preciso");
	colores.appendChild(preciso);
};

//------------ COLORES ------------
//Para poder clasificar los colores y que aparezca el nombre lo más sencillo es usar unos rangos que se llaman Matiz (Hue), convierto el hexadecimal en un valor de Matiz (0-360), es el circulo cromático.
//De esta manera dependiendo que grado sea ese color hexadecimal se puede saber que color es (obviamente yo no se de estas cosas de dibujo, he buscado con la IA la mejor forma de dividir los rangos, la he usado para eso, para que me diga los rangos y como pasar al valor de Matiz).
/**
 * Pasamos de formato hexadecimal a hsv.
 * @param {string} hexadecimal
 * @returns {Array} Devuelve el color en hsv.
 */
const hexadecimalAHsv = (hexadecimal) => {
	//Pasamos el hexadecimal a rgb
	const r =
		Math.round((parseInt(hexadecimal.substring(1, 3), 16) / 255) * 1000) / 1000;
	const g =
		Math.round((parseInt(hexadecimal.substring(3, 5), 16) / 255) * 1000) / 1000;
	const b =
		Math.round((parseInt(hexadecimal.substring(5, 7), 16) / 255) * 1000) / 1000;

	//Cosas de dibujo, sacamos el valor máximo, el mínimo y la distancia entre ellos (esa distancia se llama delta).
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;

	//Ahora pasamos a hsv (tono, saturación y valor), al final voy a aprender teoría del color.
	let h, s;
	let v = max;

	//dependiendo de que color es el máximo se aplica una fórmula.
	if (delta === 0) {
		h = 0;
	} else if (max === r) {
		h = (60 * ((g - b) / delta) + 360) % 360;
	} else if (max === g) {
		h = (60 * ((b - r) / delta) + 120) % 360;
	} else if (max === b) {
		h = (60 * ((r - g) / delta) + 240) % 360;
	}

	s = max === 0 ? 0 : delta / max;
	//añado esta condición porque se desplazaban los colores y no salían bien.
	if (s > 0.99) s = 1;
	h = Math.round(h);
	//Como hay que devolver los tres valores voy a hacerlo en un array (de la IA solo he querido ver las fórmulas porque como he dicho antes).
	let hsv = [h, s, v];
	return hsv;
};

/**
 * Recibe un color en Hexadecimal y devuelve el nombre del color.
 * @param {string} color
 * @returns {string} Devuelve el nombre del color.
 */
const rangoColor = (color) => {
	//valido que el color es válido.
	if (color.length !== 7) return "El color no es válido.";
	//desestructuramos el array.
	const [h, s, v] = hexadecimalAHsv(color);
	//definimos los umbrales de saturación y brillo.
	const saturacionMinima = 0.12;
	const casiNegro = 0.15;
	const brilloMinimo = 0.35;
	const brilloMaximo = 0.85;

	//si la saturación es muy baja será un color neutro.

	if (v < casiNegro) return "Negro";
	if (v > 0.95 && s < 0.08) return "Blanco";
	if (s < saturacionMinima) {
		if (v > brilloMaximo) return "Gris Claro";
		if (v < brilloMinimo) return "Gris Oscuro";
		return "Gris Medio";
	}

	//Color marrón (Naranja con poco brillo).
	if (h >= 20 && h < 50 && v >= brilloMinimo && v < 0.6 && s > 0.4)
		return "Marrón";

	//Luminosidad para saber si el color es claro o es oscuro.
	let nombreColor;
	if (v < brilloMinimo) {
		nombreColor = clasificarColor(h);
		return `${nombreColor} oscuro`;
	}

	if (v > brilloMaximo && s < 0.8) {
		nombreColor = clasificarColor(h);
		return `${nombreColor} claro`;
	}

	//Si no es ni claro ni oscuro devolvemos el color.
	return clasificarColor(h);
};

/**
 * Se le pasa por parámetro el valor Hue de hsv para ver que color es según su valor.
 * @param {number} h
 * @returns {string} Devuelve el nombre del color.
 */
const clasificarColor = (h) => {
	//Funciona mejor cuando se usa el navegador chrome, en realidad en un navegador que el input color sea un gradiente y no unos colores seleccionados.
	//Clasificación de los colores por Matiz, el valor de h es el HUE, es decir, los grados (me he venido arriba para ser precisa con 24 colores) al final los rangos los he hecho a prueba y error porque la IA no los da bien.
	if (h >= 352 || h < 8) return `Rojo`;
	if (h >= 8 && h < 23) return `Rojo ladrillo`;
	if (h >= 23 && h < 38) return `Naranja`;
	if (h >= 38 && h < 53) return `Amarillo oro`;
	if (h >= 53 && h < 68) return `Amarillo`;
	if (h >= 68 && h < 83) return `Verde lima`;
	if (h >= 83 && h < 98) return `Verde / Amarillo`;
	if (h >= 98 && h < 113) return `Verde pistacho`;
	if (h >= 113 && h < 128) return `Verde esmeralda`;
	if (h >= 128 && h < 143) return `Verde`;
	if (h >= 155 && h < 169) return `Verde turquesa`;
	if (h >= 169 && h < 178) return `Azul turquesa`;
	if (h >= 178 && h < 188) return `Azul cielo`;
	if (h >= 188 && h < 203) return `Azul`;
	if (h >= 203 && h < 230) return `Azul profundo`;
	if (h >= 230 && h < 260) return `Azul índigo`;
	if (h >= 260 && h < 270) return `Violeta`;
	if (h >= 270 && h < 300) return `Lila (malva)`;
	if (h >= 300 && h < 310) return `Magenta`;
	if (h >= 310 && h < 325) return `Fucsia`;
	if (h >= 315 && h < 330) return `Rosa`;
	if (h >= 325 && h < 340) return `Rosa fuerte`;
	if (h >= 340 && h < 352) return `Rojo escarlata`;

	//Por si acaso.
	return `Tono desconocido`;
};
export { crearLienzo, insertarColores, agregarBoton, rangoColor };
