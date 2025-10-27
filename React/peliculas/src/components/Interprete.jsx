import React from "react";
import "./interprete.css";
import Pelicula from "./Pelicula.jsx";

const Interprete = (props) => {
	const { actor } = props;
	return (
		<>
			<div className="interprete_interprete">
				<h1>{actor.nombre}</h1>
				<img src={actor.foto} alt={`Foto de ${actor.nombre}`} />
				<p>{actor.biografia}</p>
				<div className="interprete_peliculas">
					<h2>Películas</h2>
					{actor.peliculas.map((pelicula, indice) => {
						return <Pelicula key={indice} pelicula={pelicula}></Pelicula>;
					})}
				</div>
			</div>
		</>
	);
};

export default Interprete;
