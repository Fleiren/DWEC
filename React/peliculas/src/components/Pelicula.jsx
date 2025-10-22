import React from "react";
import "./pelicula.css";

const Pelicula = (props) => {
	const { titulo, cartelera, direccion, sinopsis } = props;
	//Este componente se centra en mostrar los datos básicos de la película.
	return (
		<>
			<h1 id="titulo">{titulo}</h1>
			<div className="pelicula_contenedor">
				<img src={cartelera} alt={`Cartel de la pelicula ${titulo}`} />
				<div className="pelicula_datos">
					<h3>Dirección:</h3>
					<p>{direccion}</p>
					<h3>Sinopsis:</h3>
					<p>{sinopsis}</p>
				</div>
			</div>
		</>
	);
};

export default Pelicula;
