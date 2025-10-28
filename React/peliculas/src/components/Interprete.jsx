import React from "react";
import "./interprete.css";
import Pelicula from "./Pelicula.jsx";

const Interprete = (props) => {
	const { interprete } = props;
	return (
		<>
			<div className="interprete_interprete">
				<h2>{interprete.nombre}</h2>
				<img src={interprete.foto} alt={`Foto de ${interprete.nombre}`} />
				<p>{interprete.biografia}</p>
				<h3>Películas</h3>
				<div className="interprete_peliculas">
					{interprete.peliculas.map((pelicula, indice) => {
						return <Pelicula key={indice} pelicula={pelicula}></Pelicula>;
					})}
				</div>
			</div>
		</>
	);
};

export default Interprete;
