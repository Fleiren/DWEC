import useShoppingListContext from "../hooks/useShoppingListContext.js";
import ShoppingList from "../components/ShoppingList.jsx";
import "./shoppingLists.css";
const ShoppingLists = () => {
	const { lists, saveShoppingList } = useShoppingListContext();
	const createList = () => {
		// Hacer un componente como el confirm pero que sea un prompt y utilizarlo aquí para recoger el nombre de la lista.
	};
	return (
		<aside className="shopping_cart_area">
			<div className="cart_placeholder">
				<h3>Lista de la compra</h3>
				<button onClick={() => {}}>+</button>
				{lists.length > 0 ? (
					lists.map((list) => <ShoppingList key={list.id} name={list.name} />)
				) : (
					<p>No hay listas.</p>
				)}
			</div>
		</aside>
	);
};

export default ShoppingLists;
