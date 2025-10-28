import React from "react";
import "./peliculaDetalles.css";
import { buscarPorId } from "./../components/libraries/gestionPeliculas.js";
import { useParams, useNavigate } from "react-router-dom";
import { formatearTaquilla } from "./../components/libraries/gestionPeliculas.js";
import Elenco from "../components/Elenco.jsx";

const PeliculaDetalles = (props) => {
	const { peliculas } = props;
	const { id } = useParams();
	const pelicula = buscarPorId(peliculas, id);
	const navigate = useNavigate();
	const volverVistaPeliculas = () => {
		navigate("/peliculas");
	};

	return (
		<>
			{pelicula ? (
				<div className="peliculaDetalles_pelicula">
					<h1>{pelicula.titulo}</h1>
					<h2>{pelicula.direccion}</h2>
					<p>{pelicula.sinopsis}</p>
					<img
						id="peliculaDetalles_cartelera"
						src={pelicula.cartelera}
						alt={`Cartelera de ${pelicula.titulo}`}
					/>

					<p>{formatearTaquilla(pelicula.taquilla, pelicula.moneda)}</p>
					{/**Le paso películas porque quiero que por interprete se muestre también todas las peliculas en las que sale. */}
					<Elenco interpretes={pelicula.elenco} peliculas={peliculas}></Elenco>
					<button
						onClick={() => {
							volverVistaPeliculas();
						}}
					>
						Volver
					</button>
				</div>
			) : (
				<div className="peliculaDetalles_error">
					<p>ERROR</p>
				</div>
			)}
		</>
	);
};

export default PeliculaDetalles;
