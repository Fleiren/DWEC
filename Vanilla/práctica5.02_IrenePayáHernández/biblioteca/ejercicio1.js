"use strict";

/**
 * Esta función permite crear la estructura de un acordeón pasandole por parámetro el contenedor donde se quiere crear y la cantidad de secciones que tendrá.
 * @param {HTMLElement} acordeon 
 * @param {number} secciones 
 */
const crearAcordeon = (acordeon, secciones) => {
	let elemento = 1;

	//Comprobamos que se le pase el contenido correcto a la función (que las secciones sean un número y que el acordeón sea un valor y de tipo div Element).
	if(isNaN(secciones) || !acordeon || acordeon.tagName !== "DIV"){
		const error = document.createElement("div");
		error.innerHTML=`<div class="error">Hay un error en la creación del acordeón.</div>`;
		document.body.appendChild(error);
	} else {

	
	//Multiplico las secciones * 2 ya que cada sección tiene su contenido.
	for (let i = 1; i <= (secciones*2) ; i++) {
		if (i % 2 === 0) {
			const div = document.createElement("div");
			div.innerHTML = `Contenido del elemento ${elemento - 1}`;
			//Al ser par, estará por defecto oculto.
			div.classList.add("ocultar");
			acordeon.appendChild(div);
		} else {
			const div = document.createElement("div");
			div.innerHTML = `Elemento ${elemento}`;
			//Al ser impar, tendrá la clase título.
			div.classList.add("titulo");
			acordeon.appendChild(div);
			elemento++;
		}
	}
}

	
};

//Con este método podemos ocultar y mostrar cuando se hace clic.
/**
 * 
 * @param {HTMLElement} div 
 */
const mostrarContenido = (div) => {
	div.classList.toggle("ocultar");
};

//Recorremos los hermanos del elemento hacia arriba para saber en que posición está (se podría hacer también con query selector).
/**
 * 
 * @param {HTMLElement} elemento 
 * @returns {number} La posición del elemento dentro del contenedor.
 */
const contarPosicion = (elemento) => {
	let anterior = elemento.previousElementSibling;
	let posicion = 1;
	while (anterior) {
		posicion++;
		anterior = anterior.previousElementSibling;
	}
	return posicion;
};

export { crearAcordeon, mostrarContenido, contarPosicion };
