"use strict";

/**
 *
 * Para poder reutilizar este método las imagenes deben guardarse con el nombre del número de pieza y sean .png en la carpeta img.
 * @param {number} cantidadImagenes
 */
const cargarImagenes = (cantidadImagenes, ruta) => {
	let imagenes = [];
	let imagen;
	for (let i = 1; i <= cantidadImagenes; i++) {
		imagen = `${ruta}${i}.png`;
		imagenes = [...imagenes, imagen];
	}
	return imagenes;
};

/**
 * Recibe un array con las rutas de las piezas y las carga en el contenedor de piezas.
 * @param {Array<string>} piezas
 */
const cargarPiezas = (piezas) => {
	const contenedorPiezas = document.getElementsByClassName("piezas")[0];
	contenedorPiezas.classList.add("soltable");
	//Desordenamos las piezas.
	const imagenes = desordenarArray(piezas);
	for (let i = 0; i < imagenes.length; i++) {
		//Con esto puedo sacar el número de la imagen para que se registre en el id de forma correcta usando esa expresión regular ya que con ella, puedo extraer los números de un string.
		//He usado la IA para que me dijera si exixtía una expresión regular que hiciera esto ya que con substring se me complicaba saber si hay un número o dos.
		const imagen = document.createElement("img");
		imagen.src = imagenes[i];
		imagen.alt = `Pieza ${imagenes[i].match(/\d+/g)[0]}.`;
		imagen.id = `${imagenes[i].match(/\d+/g)[0]}pieza.`;
		//Añadimos las clases necesarias para los eventos.
		imagen.classList.add("arrastrable", "soltable");
		//Necesario para que se pueda arrastrar.
		imagen.setAttribute("draggable", true);
		contenedorPiezas.appendChild(imagen);
	}
	
};

/**
 * Recibe por parámetro la cantidad de piezas que tendrá el tablero para generar las celdas necesarias.
 * @param {number} cantidadPiezas 
 */
const crearTablero = (cantidadPiezas) => {
	const tablero = document.getElementsByClassName("tablero")[0];
	for (let i = 1; i <= cantidadPiezas; i++) {
		const div = document.createElement("div");
		//Asignamos el id para comprobar el orden después.
		div.id = i;
		div.classList.add("soltable");
		tablero.appendChild(div);
	}
};

/**
 * Vacía el tablero y devuelve las piezas al contenedor de piezas de forma desordenada.
 */
const vaciarTablero = () => {
	let tablero = Array.from(document.getElementsByClassName("tablero")[0].children);
	tablero = desordenarArray(tablero);
	const contenedorPiezas = document.getElementsByClassName("piezas")[0];
	for (let casilla of tablero) {
		if (casilla.children.length === 1)
			contenedorPiezas.appendChild(casilla.firstChild);
	}
};

/**
 * Comprueba cuántas celdas del tablero están llenas.
 * @param {HTMLElement} tablero 
 * @returns {number} Número de celdas llenas del tablero.
 */
const comprobarCeldasLlenas = (tablero) => {
	let celdasLlenas = 0;
	for (const div of tablero.children) {
		if (div.children.length === 1) celdasLlenas++;
	}

	return celdasLlenas;
};

/**
 * Comprueba si las piezas están en el orden correcto gracias al id de cada pieza y el id de la celda.
 * @param {HTMLElement} tablero 
 * @returns {boolean} Devuelve true si las piezas están en el orden correcto.
 */
const comprobarOrden = (tablero) => {
	let correctas = 0;
	const piezas = tablero.children;
	for (const pieza of piezas) {
		let idPieza = pieza.firstChild.id;
		//Volvemos a usar la expresión regular porque hay piezas con dos dígitos.
		if (pieza.id === idPieza.match(/\d+/g)[0]) correctas++;
	}

	return correctas === tablero.children.length;
};

/**
 * Recibe un array y lo desordena.
 * @param {Array} array 
 * @returns {Array} Devuelve un array desordenado.
 */
const desordenarArray = (array) => {
	let desordenado = [];
	let posicionesSeleccionadas = [];
	let posiciones = array.length;
	//Mientras no se hayan seleccionado todas las posiciones se seguirá buscando una posición aleatoria (creo que no es la forma más eficiente).
	while (posicionesSeleccionadas.length < posiciones) {
		let indiceAleatorio = Math.floor(Math.random() * posiciones);
		if (!posicionesSeleccionadas.includes(indiceAleatorio)) {
			posicionesSeleccionadas = [...posicionesSeleccionadas, indiceAleatorio];
			desordenado = [...desordenado, array[indiceAleatorio]];
		}
	}
	return desordenado;
};

/**
 * 
 * @param {HTMLElement} tablero 
 * @param {HTMLElement} piezas 
 */
const vaciarTableroYPiezas = (tablero, piezas) => {
	//Vaciamos el contenido de los dos contenedores porque cada nivel tiene un número distinto de piezas.
	tablero.innerHTML = "";
	piezas.innerHTML = "";
};

export {
	crearTablero,
	cargarPiezas,
	comprobarCeldasLlenas,
	comprobarOrden,
	cargarImagenes,
	vaciarTablero,
	vaciarTableroYPiezas,
};
