import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = () => {
	return (
		<>
			<nav>
				<Link className="menu_elemento" to="/acercaDe">
					Acerca de
				</Link>
				<Link className="menu_elemento" to="/galeria">
					Galería
				</Link>
				<Link className="menu_elemento" to="/">
					Inicio
				</Link>
				<Link className="menu_elemento" to="/interpretes">
					Intérpretes
				</Link>
				<Link className="menu_elemento" to="/peliculas">
					Películas
				</Link>
			</nav>
		</>
	);
};

export default Menu;
