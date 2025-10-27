import React from "react";
import "./galeria.css";
import MenuGaleria from "./../components/menu/submenu/MenuGaleria.jsx";
import { Outlet } from "react-router-dom";

//Habia pensado usar Outlet para que cada filtro fuera una subpágina pero hay que usar cosas que no hemos dado y no se si sería mejor práctica
//ya que teniendo useState es más legible el código.
const Galeria = () => {
	return (
		<>
			<div className="galeria_galeria">
				<div className="galeria_contenido">
					<h1>Esta es la página de galería</h1>
					<div className="galeria_carteleras">{}</div>
				</div>
				<MenuGaleria></MenuGaleria>
			</div>
		</>
	);
};

export default Galeria;
