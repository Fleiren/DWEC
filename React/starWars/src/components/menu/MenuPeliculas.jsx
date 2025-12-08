import { React } from "react";
import { Link } from "react-router-dom";
import "./menuPeliculas.css";
const MenuPeliculas = ({ datosPeliculas }) => {
	return (
		<>
			<div className="contenedor_menuPeliculas">
				{datosPeliculas.map((pelicula) => {
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
