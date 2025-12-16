"use strict";
import { obtenerIdUrl } from "./datos.js";
const patrones = {};

const errores = {
	nombre: "El nombre debe tener al menos 5 letras.",
	clima: "Debes seleccionar un clima",
	diametro: "El diametro debe ser de al menos 1000km.",
};

const crearPlantillaPersonajes = (personajes) => {
	let plantilla = "";
	for (let personaje of personajes) {
		plantilla += `<option value="${personaje.name}" id="${obtenerIdUrl(
			personaje.url
		)}">`;
	}

	return plantilla;
};

const recogerDatos = (formulario) => {
	return {
		nombre: formulario[0].value,
	};
};

export { crearPlantillaPersonajes };
