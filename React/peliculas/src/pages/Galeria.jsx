import React from "react";
import "./galeria.css";
import MenuGaleria from "./../components/menu/submenu/MenuGaleria.jsx";
import Cartelera from "./../components/Cartelera.jsx";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Galeria = (props) => {
	//Utilizo el hook useLocation para saber si estoy en la ruta principal y así mostrar el contenido por defecto
	const location = useLocation();
	const paginaPrincipal = location.pathname === "/galeria";
	const { peliculas } = props;
	return (
		<>
			{/**
			 * Con una ternaria y el hook puedo controlar que voy a mostrar por pantalla, si la subruta por el outlet o la información por defecto.
			 */}
			<div className="galeria_galeria">
				<MenuGaleria></MenuGaleria>
				<div className="galeria_contenido">
					<h1>Esta es la página de galería</h1>
					<div className="galeria_carteleras">
						{paginaPrincipal ? (
							peliculas.map((pelicula) => {
								return (
									<Cartelera key={pelicula.id} pelicula={pelicula}></Cartelera>
								);
							})
						) : (
							<Outlet></Outlet>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Galeria;
