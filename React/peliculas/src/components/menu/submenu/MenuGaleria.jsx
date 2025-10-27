import React from "react";
import "./menuGaleria.css";
import { Link } from "react-router-dom";

const MenuGaleria = () => {
	return (
		<>
			<nav>
				<Link to="/galeria/titulo">Ordenar por título</Link>
				<Link to="/galeria/interprete">Ordenar por intérprete</Link>
				<Link to="/galeria/director">Ordenar por director</Link>
			</nav>
		</>
	);
};

export default MenuGaleria;
