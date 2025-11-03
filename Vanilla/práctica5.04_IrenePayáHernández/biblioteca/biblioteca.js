"use strict";

const crearTablero = (cantidadPiezas) => {};

/**
 * Para poder reutilizar las imagenes deben guardarse con el nombre del número de pieza y sean .png en la carpeta img.
 * @param {number} cantidadPiezas
 */
const cargarPiezas = (cantidadPiezas) => {
	const contenedorPiezas = document.getElementsByClassName("piezas")[0];
	for (let i = 1; i <= cantidadPiezas; i++) {
		const imagen = document.createElement("img");
		imagen.src = `./img/${i}.png`;
		imagen.alt = `Pieza ${i}`;
		contenedorPiezas.appendChild(imagen);
	}
};

export { crearTablero, cargarPiezas };
