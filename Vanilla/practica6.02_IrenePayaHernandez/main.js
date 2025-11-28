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

	/**
	 * Obtiene los datos de las películas de forma asíncrona.
	 */
	const cargarPagina = async () => {
		peliculas.innerHTML = "<p>Se están cargando los datos...</p>";
		try {
			datos = await obtenerDatos(url, tipoDeDato);
			//Obtengo los datos de las películas de esta manera porque así debo tratarlos por como me los envía la api.
			datos = datos.results;
			peliculas.innerHTML = pintarTitulosPelicula(datos);
		} catch (error) {
			contenedorInformacion.innerHTML = `<h1>${error.message}</h1>`;
		}
	};
	cargarPagina();

	//Cuando se haga clic al título de alguna película se obtendrán los datos de la película correspondiente.
	//El evento está declarado fuera del try ya que así aligeramos el el método cargar página y con la condición que hay en el evento nos aseguramos que los datos ya estarán guardados ya que
	//si no se han cargado los datos, los div con los titulos de las películas no aparecerán.
	peliculas.addEventListener(
		"click",
		(evento) => {
			//Si hay datos y el elemento tiene la clase tituloPelicula.
			if (
				datos &&
				datos.length !== 0 &&
				evento.target.classList.contains("tituloPelicula")
			) {
				//Obtiene la id de la película ya que la id del div que contiene el titulo de la película es su id.
				let pelicula = obtenerPeliculaPorId(datos, evento.target.id);
				//Pintamos los datos de la película.
				contenedorInformacion.innerHTML = pintarDatosPelicula(pelicula);
			}
		},
		false
	);
}; //Fin de window.onload
