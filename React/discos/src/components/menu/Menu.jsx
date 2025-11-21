import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
	return (
		<>
			<nav>
				<Link className="menu_elemento" to="/">
					Inicio
				</Link>
				<Link className="menu_elemento" to="/insertarDisco">
					Insertar disco
				</Link>
				<Link className="menu_elemento" to="/listarDiscos">
					Listar discos
				</Link>
			</nav>
		</>
	);
};

export default Menu;
