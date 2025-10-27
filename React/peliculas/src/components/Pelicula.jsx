import React from "react";
import { useNavigate } from "react-router-dom";
import "./pelicula.css";

const Pelicula = (props) => {
	const { pelicula } = props;
	const navigate = useNavigate();
	const verDetalles = () => {
		navigate("/peliculas/detalles", pelicula);
	};

	return (
		<>
			<div
				className="pelicula_pelicula"
				onClick={() => {
					verDetalles();
				}}
			>
				<img src={pelicula.cartelera} alt={`Cartelera de ${pelicula.titulo}`} />
				<h2>{pelicula.titulo}</h2>
				<p>{pelicula.anio}</p>
			</div>
		</>
	);
};

export default Pelicula;
