import React from "react";
import "./interprete.css";
import Pelicula from "./Pelicula.jsx";

const Interprete = (props) => {
	const { interprete } = props;
	return (
		<>
			<div className="interprete_interprete">
				<h1>{interprete.nombre}</h1>
				<img src={interprete.foto} alt={`Foto de ${interprete.nombre}`} />
				<p>{interprete.biografia}</p>
				<div className="interprete_peliculas">
					<h2>Películas</h2>
					{interprete.peliculas.map((pelicula, indice) => {
						return <Pelicula key={indice} pelicula={pelicula}></Pelicula>;
					})}
				</div>
			</div>
		</>
	);
};

export default Interprete;
