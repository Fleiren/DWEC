import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext.js";
import "./menu.css";
const Menu = () => {
	const { isAuthenticated } = useAuthContext();
	return (
		<nav>
			<>
				<Link className="element" to="/productList">
					Productos
				</Link>
				{/** Solo se mostrará la lista de la compra a los que estén registrados. */}
				{isAuthenticated && (
					<Link className="element" to="/shoppingList">
						Lista de la compra
					</Link>
				)}
			</>
		</nav>
	);
};
export default Menu;
