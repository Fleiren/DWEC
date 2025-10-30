"use strict";
//Aprovecho que para el ejercicio 1 he hecho un método que calcula la posición de un elemento entre todos sus hermanos.
import { contarPosicion } from "./ejercicio1.js";

const contenidoPestana = (pestana) => {
	const paginas = Array.from(
		document.getElementsByClassName("contenido")[0].children
	);
	console.log(paginas);

	let posicionPestana = contarPosicion(pestana);
	paginas[posicionPestana - 1].classList.toggle("ocultar");
};

export { contenidoPestana };
