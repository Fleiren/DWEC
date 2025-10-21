import React from "react";
import "./pelicula.css";

const Pelicula = (props) => {
	return (
		<div className="pelicula_contenedor">
			<img
				className="pelicula_cartelera"
				src={props.cartelera}
				alt={props.titulo}
			></img>
			<div className="pelicula_contenido">
				<div>
					<h1 id="titulo">{props.titulo}</h1>
					<h3>Director: {props.direccion}.</h3>
					<p id="sinopsis">{props.sinopsis}</p>
					<h3>Elenco:</h3>
				</div>
				<div className="pelicula_interpretes">{props.children}</div>
			</div>
		</div>
	);
};

export default Pelicula;
