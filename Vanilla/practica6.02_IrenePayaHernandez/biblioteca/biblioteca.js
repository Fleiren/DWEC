"use strict";

/**
 * Obtiene datos de una URL y los devuelve en el formato especificado.
 * @param {string} url
 * @param {string} tipoDeDato
 * @returns
 */
const obtenerDatos = (url, tipoDeDato) => {
	//La idea es que sea una función genérica que sirva para cualquier URL y cualquier tipo de dato.

	//Realiza la petición a la URL.
	return fetch(url)
		.then((respuesta) => {
			//Si la respuesta no es correcta hay un error en la url
			if (!respuesta.ok) throw new Error("Error en la url.");
			// Comprueba el tipo de dato para que sea devuelto en el formato correcto.
			if (tipoDeDato.toLowerCase() === "json") return respuesta.json();
			if (tipoDeDato.toLowerCase() === "text") return respuesta.text();
			if (tipoDeDato.toLowerCase() === "blop") return respuesta.blop();
		})
		.then((datos) => {
			//Si no obtenemos datos de la api se muestra un error indicándolo.
			if (!datos) throw new Error("No hay datos");
			// Devuelve los datos obtenidos.
			//No hago aquí lo de datos.results porque quiero que la función sea genérica.
			return datos;
		})
		.catch((error) => {
			//Devolvemos el error que se produzca ya sea personalizado o no.
			return error;
		});
};

/**
 * Genera una plantilla HTML con los títulos de las películas.
 * @param {Array} peliculas
 * @returns {string} Plantilla con los títulos de las películas.
 */
const pintarTitulosPelicula = (peliculas) => {
	let plantilla = "";
	if (peliculas && peliculas.length !== 0) {
		for (const pelicula of peliculas) {
			plantilla += `<div class="tituloPelicula" id=${pelicula.episode_id}>${pelicula.title}</div>`;
		}
	}
	return plantilla;
};

/**
 *
 * @param {Array} peliculas
 * @param {string} id
 * @returns {Object} Película con el id que se ha pasado por parámetro.
 */
const obtenerPeliculaPorId = (peliculas, id) => {
	return peliculas.find((pelicula) => {
		return parseInt(pelicula.episode_id) === parseInt(id);
	});
};

/**
 * Genera una plantilla HTML con los datos de la película.
 * @param {Object} pelicula
 * @returns {string} Plantilla HTML con los datos de la película.
 */
const pintarDatosPelicula = (pelicula) => {
	const fecha = formatearFechaEuropea(pelicula.release_date);
	return `<h1>${pelicula.title}</h1><h3>Sinopsis</h3><p>${pelicula.opening_crawl}</p><h3>Director</h3><p>${pelicula.director}</p><h3>Productor</h3><p>${pelicula.producer}</p><h3>Fecha de lanzamiento</h3><p>${fecha}</p>`;
};

/**
 * Formatea una fecha en formato europeo (dd/mm/yyyy).
 * @param {string} fecha
 * @returns {string} Fecha formateada en formato europeo.
 */
const formatearFechaEuropea = (fecha) => {
	const formatoFechaEuropea = new Date(fecha);
	return formatoFechaEuropea.toLocaleDateString();
};

export {
	obtenerDatos,
	pintarTitulosPelicula,
	obtenerPeliculaPorId,
	pintarDatosPelicula,
};
