import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextoPeliculas } from "../../context/ProveedorPeliculas.jsx";
import "./menuPeliculas.css";
const MenuPeliculas = () => {
	const { peliculas } = useContext(ContextoPeliculas);
	return (
		<>
			<div className="contenedor_menuPeliculas">
				{peliculas.map((pelicula) => {
					return (
						<Link
							key={pelicula.episode_id}
							to={`/peliculas/${pelicula.episode_id}`}
						>
							{pelicula.title}
						</Link>
					);
				})}
			</div>
		</>
	);
};

export default MenuPeliculas;
