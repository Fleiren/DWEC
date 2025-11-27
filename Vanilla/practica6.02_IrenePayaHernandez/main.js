"use strict";
import {
	obtenerDatos,
	pintarTitulosPelicula,
	obtenerPeliculaPorId,
	pintarDatosPelicula,
} from "./biblioteca/biblioteca.js";
window.onload = () => {
	const peliculas = document.getElementById("peliculas");
	const contenedorInformacion = document.getElementById("informacion");
	const url = "https://swapi.dev/api/films";
	const tipoDeDato = "json";
	let datos = [];

	const cargarPagina = async () => {
		peliculas.innerHTML = "<p>Se están cargando los datos</p>";
		try {
			datos = await obtenerDatos(url, tipoDeDato);
			peliculas.innerHTML = pintarTitulosPelicula(datos);
		} catch (error) {
			contenedorInformacion.innerHTML = `<h1>${error.message}</h1>`;
		}
	};
	cargarPagina();

	peliculas.addEventListener(
		"click",
		(evento) => {
			if (
				datos &&
				datos.length !== 0 &&
				evento.target.classList.contains("tituloPelicula")
			) {
				let pelicula = obtenerPeliculaPorId(datos, evento.target.id);

				contenedorInformacion.innerHTML = pintarDatosPelicula(pelicula);
			}
		},
		false
	);
}; //Fin de window.onload
