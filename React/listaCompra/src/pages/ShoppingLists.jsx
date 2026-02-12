import useShoppingListContext from "../hooks/useShoppingListContext.js";
import ShoppingList from "../components/ShoppingList.jsx";
import ShoppingListDetails from "../components/ShoppingListDetails.jsx";
import { useState } from "react";
import Prompt from "../components/Prompt.jsx";
import LoadingMini from "../components/LoadingMini.jsx";
import "./shoppingLists.css";
const ShoppingLists = () => {
	const {
		lists,
		saveShoppingList,
		selectedList,
		clearSelectedList,
		getListById,
		getProductsFromList,
		loadingLists,
	} = useShoppingListContext();
	const [showPrompt, setShowPrompt] = useState(false);
	//Me he decantado por el siguiente diseño para mostrar los detalles de la lista: al pulsar sobre el nombre de la lista se mostrará en el espacio reservado para las listas, en vez de las listas, los productos de la lista seleccionada y un botón de volver para ver las listas otra vez.

	const createList = (listName) => {
		//Preparamos el objeto con el formato necesario para guardarlo en la base de datos, el proveedor se encargará de añadir los datos que faltan.
		const list = {
			name: listName,
		};
		saveShoppingList(list);
		setShowPrompt(false);
	};

	const clearPrompt = () => {
		setShowPrompt(false);
	};

	const changeSelectedList = (evento) => {
		if (evento.target.classList.contains("name_list")) {
			getListById(evento.target.dataset.id);
			getProductsFromList(evento.target.dataset.id);
		}
	};
	return (
		<aside className="shopping_cart_area">
			<div className="cart_placeholder">
				{!selectedList ? (
					<div
						className="shopping_lists"
						onClick={(evento) => {
							changeSelectedList(evento);
						}}
					>
						<h3>Listas de la compra</h3>
						<button
							id="button_addList"
							onClick={() => {
								setShowPrompt(true);
							}}
						>
							+
						</button>
						{loadingLists ? (
							<div style={{ padding: "20px", textAlign: "center" }}>
								<LoadingMini />
							</div>
						) : lists.length > 0 ? (
							lists.map((list) => <ShoppingList key={list.id} list={list} />)
						) : (
							<p>No hay listas.</p>
						)}
					</div>
				) : (
					//En clase me dijiste que no era buena práctica pasar un método que maneja un estado de un componente padre al hijo de esta manera, pero para este caso no se me ocurre otra forma de hacerlo, igual el diseño directamente no es el mejor.
					<ShoppingListDetails list={selectedList} goBack={clearSelectedList} />
				)}
				{showPrompt && (
					<Prompt
						message="Introduce el nombre de la lista."
						onSubmit={createList}
						onCancel={clearPrompt}
					/>
				)}
			</div>
		</aside>
	);
};

export default ShoppingLists;
