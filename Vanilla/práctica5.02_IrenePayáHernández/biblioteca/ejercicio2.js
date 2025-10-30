"use strict";
//Aprovecho que para el ejercicio 1 he hecho un método que calcula la posición de un elemento entre todos sus hermanos.
import { contarPosicion } from "./ejercicio1.js";

const contenidoPestana = (pestana) => {
	const paginas = document.getElementsByClassName("contenido")[0].children;
	let posicionPestana = contarPosicion(pestana);
	for (let i = 0; i < paginas.length; i++) {
		paginas[i] === paginas[posicionPestana - 1]
			? paginas[i].classList.remove("ocultar")
			: paginas[i].classList.add("ocultar");
	}
};

export { contenidoPestana };
