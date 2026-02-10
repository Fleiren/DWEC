import useShoppingListContext from "../hooks/useShoppingListContext.js";
import ShoppingList from "../components/ShoppingList.jsx";
import ShoppingListDetails from "../components/ShoppingListDetails.jsx";
import { useState } from "react";
import Prompt from "../components/Prompt.jsx";
import "./shoppingLists.css";
const ShoppingLists = () => {
	const { lists, saveShoppingList } = useShoppingListContext();
	const [showPrompt, setShowPrompt] = useState(false);
	//Me he decantado por el siguiente diseño para mostrar los detalles de la lista: al pulsar sobre el nombre de la lista se mostrará en el espacio reservado para las listas, en vez de las listas, los productos de la lista seleccionada y un botón de volver para ver las listas otra vez.
	const [selectedList, setSelectedList] = useState(null);

	const createList = (listName) => {
		//Preparamos el objeto con el formato necesario para guardarlo en la base de datos, el proveedor se encargará de añadir los datos que faltan.
		const list = {
			name: listName,
		};
		saveShoppingList(list);
		setShowPrompt(false);
	};

	//PREGUNTAR EL TEMA DE DELEGACIÓN DE EVENTOS, ¿ESTO ESTÁ BIEN O ES MEJOR UN ONCLICK EN EL COMPONENTE SHOPPINGLIST?
	const changeSelectedList = (evento) => {
		if (evento.target.name === "list") {
			setSelectedList(lists.find((list) => list.id === evento.target.value));
		}
	};
	return (
		<aside className="shopping_cart_area">
			<div className="cart_placeholder">
				{!selectedList ? (
					<div className="shopping_lists" onClick={changeSelectedList}>
						<h3>Listas de la compra</h3>
						<button
							id="button_addList"
							onClick={() => {
								setShowPrompt(true);
							}}
						>
							+
						</button>
						{lists.length > 0 ? (
							lists.map((list) => <ShoppingList key={list.id} list={list} />)
						) : (
							<p>No hay listas.</p>
						)}
					</div>
				) : (
					<ShoppingListDetails
						list={selectedList}
						onBack={() => setSelectedList(null)}
					/>
				)}
				{showPrompt && (
					<Prompt
						message="Introduce el nombre de la lista."
						onSubmit={createList}
						onCancel={() => setShowPrompt(false)}
					/>
				)}
			</div>
		</aside>
	);
};

export default ShoppingLists;
