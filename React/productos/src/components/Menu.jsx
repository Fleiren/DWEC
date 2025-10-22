import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = () => {
	return (
		<>
			<nav className="menu_contenedor">
				<Link className="menu_elemento" to="/">
					Inicio
				</Link>
				<Link className="menu_elemento" to="/acercaDe">
					Acerca De
				</Link>
				<Link className="menu_elemento" to="/productos">
					Productos
				</Link>
				<Link className="menu_elemento" to="/contacto">
					Contacto
				</Link>
			</nav>
		</>
	);
};

export default Menu;
