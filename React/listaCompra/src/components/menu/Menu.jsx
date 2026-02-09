import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext.js";
import useShoppingListContext from "../../hooks/useShoppingListContext.js";
import "./menu.css";
const Menu = () => {
	const { isAuthenticated } = useAuthContext();
	const { isShoppingListVisible, toggleShoppingList } =
		useShoppingListContext();
	return (
		<nav>
			<>
				<Link className="element" to="/productList">
					Productos
				</Link>
				{/** Para la siguiente práctica quiero investigar para hacer esto bien con un outlet porque esto lo veo un poco chapuza la verdad (pongo un enlace para que se parezca al link).*/}
				{isAuthenticated && (
					<a
						className={`element ${isShoppingListVisible ? "active" : ""}`}
						onClick={toggleShoppingList}
						style={{ cursor: "pointer" }}
					>
						{isShoppingListVisible ? "Ocultar Lista" : "Lista de la compra"}
					</a>
				)}
			</>
		</nav>
	);
};
export default Menu;
