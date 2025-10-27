import React from "react";
import { useNavigate } from "react-router-dom";
const Cartelera = (props) => {
	const { pelicula } = props;
	const navigate = useNavigate();
	return (
		<>
			<div className="cartelera_cartelera">
				<img
					src={pelicula.foto}
					alt={`Cartelera de ${pelicula.titulo}`}
					onClick={() => {
						navigate(`/peliculas/${pelicula.id}`);
					}}
				/>
			</div>
		</>
	);
};

export default Cartelera;
