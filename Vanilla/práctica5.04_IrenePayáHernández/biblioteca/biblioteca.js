"use strict";

/**
 *
 * Para poder reutilizar este método las imagenes deben guardarse con el nombre del número de pieza y sean .png en la carpeta img.
 * @param {number} cantidadImagenes
 */
const cargarImagenes = (cantidadImagenes) => {
	let imagenes = [];
	let imagen;
	for (let i = 1; i <= cantidadImagenes; i++) {
		imagen = `./img/${i}.png`;
		imagenes = [...imagenes, imagen];
	}
	return imagenes;
};

/**
 *
 */
const cargarPiezas = (piezas) => {
	const contenedorPiezas = document.getElementsByClassName("piezas")[0];
	contenedorPiezas.classList.add("soltable");
	const imagenes = desordenarArray(piezas);
	for (let i = 0; i < imagenes.length; i++) {
		const imagen = document.createElement("img");
		imagen.src = imagenes[i];
		imagen.alt = `Pieza ${imagenes[i].substring(6, 7)}.`;
		imagen.id = `${imagenes[i].substring(6, 7)}pieza.`;
		imagen.classList.add("arrastrable", "soltable");
		imagen.setAttribute("draggable", true);
		contenedorPiezas.appendChild(imagen);
	}
};

const crearTablero = (cantidadPiezas) => {
	const tablero = document.getElementsByClassName("tablero")[0];
	for (let i = 1; i <= cantidadPiezas; i++) {
		const div = document.createElement("div");
		div.id = i;
		div.classList.add("soltable", "arrastrable");
		tablero.appendChild(div);
	}
};

const comprobarCeldasLlenas = (tablero) => {
	let celdasLlenas = 0;
	for (const div of tablero.children) {
		if (div.children.length === 1) celdasLlenas++;
	}

	return celdasLlenas;
};

const comprobarOrden = (tablero) => {
	let correctas = 0;
	const piezas = tablero.children;
	for (const pieza of piezas) {
		//El alt de la pieza tiene el número de pieza, debe coincidir con la casilla, también se puede usar el nombre de la imagen.
		let idPieza = pieza.firstChild.id;
		if (pieza.id === idPieza.substring(0, 1)) correctas++;
	}

	return correctas === tablero.children.length;
};

const desordenarArray = (array) => {
	let desordenado = [];
	let posicionesSeleccionadas = [];
	let posiciones = array.length;
	while (posicionesSeleccionadas.length < posiciones) {
		let indiceAleatorio = Math.floor(Math.random() * posiciones);
		if (!posicionesSeleccionadas.includes(indiceAleatorio)) {
			posicionesSeleccionadas = [...posicionesSeleccionadas, indiceAleatorio];
			desordenado = [...desordenado, array[indiceAleatorio]];
		}
	}

	return desordenado;
};
export {
	crearTablero,
	cargarPiezas,
	comprobarCeldasLlenas,
	comprobarOrden,
	cargarImagenes,
};
