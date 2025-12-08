import { Link } from "react-router-dom";
import "./menu.css";

const Menu = () => {
	return (
		<>
			<nav>
				<Link className="menu_elemento" to="/">
					Inicio
				</Link>
				<Link className="menu_elemento" to="/peliculas">
					Peliculas
				</Link>
			</nav>
		</>
	);
};

export default Menu;
