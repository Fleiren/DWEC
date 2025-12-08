import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	obtenerPeliculaPorId,
	obtenerDatosDesdeArray,
	obtenerDiezFulfilled,
	obtenerIdUrl,
} from "../libraries/datosApi";
import Actor from "./../components/Actor.jsx";
import "./pelicula.css";
const Pelicula = ({ datosPeliculas }) => {
	const { id } = useParams();
	const [actores, setActores] = useState([]);
	const pelicula = obtenerPeliculaPorId(datosPeliculas, id);
	const navigate = useNavigate();

	const obtenerActores = async () => {
		const listaActores = await obtenerDatosDesdeArray(pelicula.characters);
		console.log(listaActores);
		//Solo queremos 10 por lo que voy a filtrar los que han sido completados con éxito y de ahí cojo 10.
		const diezActores = obtenerDiezFulfilled(listaActores);
		setActores(diezActores);
	};

	const mostrarDetalles = (evento) => {
		if (evento.target.className === "detalles_actor") {
			//Los actores los muestro en otra página por lo que navego a esa ruta.
			navigate(`/actor/${evento.target.id}`);
		}
	};

	//Cada vez que cambie el id de la película, vuelvo a obtener los actores.
	useEffect(() => {
		//Limpio los actores antes de obtener los nuevos porque si no se ven los antiguos hasta que cargan los nuevos y eso queda feo.
		setActores([]);
		obtenerActores();
	}, [id]);
	//Si no hay película o no hay actores, muestro cargando. (Creo que me falta implementar esta validación en más sitios).
	if (!pelicula || actores.length === 0) {
		return (
			<img
				className="cargando"
				src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif"
			/>
		);
	}
	return (
		<>
			<div>
				<h1>{pelicula.title}</h1>
				<h3>Sinopsis</h3>
				<p>{pelicula.opening_crawl}</p>
				<h3>Director</h3>
				<p>{pelicula.director}</p>
				<h3>Productor</h3>
				<p>{pelicula.producer}</p>
				<h3>Fecha de lanzamiento</h3>
				<p>{pelicula.release_date}</p>
				<hr />
				<h3>Actores</h3>
				<div className="contenedor_actores" onClick={mostrarDetalles}>
					{actores &&
						//Pintamos cada actor mediante un componente y le pasamos los datos (al final solo uso el nombre) y el id extraído de la url para poder navegar a su página de detalles.
						actores.map((actor) => {
							const id = obtenerIdUrl(actor.url);
							return <Actor key={id} id_actor={id} datos={actor}></Actor>;
						})}
				</div>
			</div>
		</>
	);
};

export default Pelicula;
