"use strict";

/**
 *
 * Para poder reutilizar las imagenes deben guardarse con el nombre del número de pieza y sean .png en la carpeta img.
 * @param {number} cantidadImagenes
 */
const cargarImagenes = (cantidadImagenes) => {
	const imagenes = [];
	let imagen;
	for (let i = 1; i <= cantidadImagenes; i++) {
		imagen = `./img/${i}.png`;
		imagenes = [...imagenes, imagen];
	}
	console.log(imagenes);
	return imagenes;
};
/**
 *
 */
const cargarPiezas = (piezas) => {
	const contenedorPiezas = document.getElementsByClassName("piezas")[0];
	for (let i = 1; i <= ca; i++) {
		const imagen = document.createElement("img");
		imagen.src = `./img/${i}.png`;
		imagen.alt = `Pieza ${i}`;
		imagen.id = i;
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
	return true;
};

export {
	crearTablero,
	cargarPiezas,
	comprobarCeldasLlenas,
	comprobarOrden,
	cargarImagenes,
};
