import { React, useState } from "react";
import Pelicula from "./../components/Pelicula.jsx";
import "./peliculas.css";
import { Outlet } from "react-router-dom";

const Peliculas = (props) => {
	const { peliculas } = props;
	return (
		<>
			<div className="peliculas_contenedor">
				<h1>Esta es la página de películas</h1>
				<div className="peliculas_peliculas">
					{peliculas.map((pelicula) => {
						return <Pelicula key={pelicula.id} pelicula={pelicula}></Pelicula>;
					})}
				</div>
			</div>
		</>
	);
};

export default Peliculas;
