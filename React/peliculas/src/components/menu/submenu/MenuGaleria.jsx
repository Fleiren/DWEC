import React from "react";
import "./menuGaleria.css";
import { Link } from "react-router-dom";

const MenuGaleria = () => {
	return (
		<>
			<nav className="menuGaleria_contenedor">
				<Link className="menuGaleria_elemento" to="/galeria/titulo">
					Ordenar por título
				</Link>
				<Link className="menuGaleria_elemento" to="/galeria/interprete">
					Ordenar por intérprete
				</Link>
				<Link className="menuGaleria_elemento" to="/galeria/director">
					Ordenar por director
				</Link>
			</nav>
		</>
	);
};

export default MenuGaleria;
