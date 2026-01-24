import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import "./menu.css";
const Menu = () => {
	const { isAuthenticated } = useAuth();
	return (
		<nav>
			{isAuthenticated && (
				<>
					<Link className="element" to="/productList">
						Productos
					</Link>
					<Link className="element" to="/shoppingList">
						Lista de la compra
					</Link>
				</>
			)}
		</nav>
	);
};
export default Menu;
