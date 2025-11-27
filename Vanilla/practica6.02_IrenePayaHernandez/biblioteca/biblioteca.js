"use strict";

const obtenerDatos = (url, tipoDeDato) => {
	return fetch(url)
		.then((respuesta) => {
			if (tipoDeDato.toLowerCase() === "json") return respuesta.json();
			if (tipoDeDato.toLowerCase() === "text") return respuesta.text();
			if (tipoDeDato.toLowerCase() === "blop") return respuesta.blop();
		})
		.then((datos) => {
			return datos.results;
		})
		.catch((error) => {
			return error;
		});
};

const pintarTitulosPelicula = (peliculas) => {
	let plantilla = "";
	if (peliculas && peliculas.length !== 0) {
		for (const pelicula of peliculas) {
			plantilla += `<div class="tituloPelicula" id=${pelicula.episode_id}>${pelicula.title}</div>`;
		}
	}
	return plantilla;
};

const obtenerPeliculaPorId = (peliculas, id) => {
	return peliculas.find((pelicula) => {
		return parseInt(pelicula.episode_id) === parseInt(id);
	});
};

const pintarDatosPelicula = (pelicula) => {
	const fecha = formatearFechaEuropea(pelicula.release_date);
	return `<h1>${pelicula.title}</h1><h3>Sinopsis</h3><p>${pelicula.opening_crawl}</p><h3>Director</h3><p>${pelicula.director}</p><h3>Productor</h3><p>${pelicula.producer}</p><h3>Fecha de lanzamiento</h3><p>${fecha}</p>`;
};

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
