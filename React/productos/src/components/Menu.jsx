import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = () => {
	return (
		<>
			<nav className="menu_contenedor">
				{/*He quitado inicio para que tengan más sentido los botones de inicio por página.*/}
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
