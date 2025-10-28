import React from "react";
import { useNavigate } from "react-router-dom";
import "./pelicula.css";

const Pelicula = (props) => {
	const { pelicula } = props;
	const navigate = useNavigate();

	const verDetalles = () => {
		navigate(`/peliculas/${pelicula.id}`);
	};

	return (
		<>
			<div className="pelicula_pelicula">
				<img
					src={pelicula.cartelera}
					alt={`Cartelera de ${pelicula.titulo}`}
					onClick={() => {
						verDetalles();
					}}
				/>
				<h2>{pelicula.titulo}</h2>
				<p>{pelicula.anio}</p>
			</div>
		</>
	);
};

export default Pelicula;
