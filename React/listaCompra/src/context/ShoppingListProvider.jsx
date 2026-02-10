import { createContext, useState, useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext.js";
import useSupabaseCRUD from "../hooks/useSupabaseCRUD.js";
import useMessageContext from "../hooks/useMessageContext.js";
const ShoppingListContext = createContext();
const ShoppingListProvider = ({ children }) => {
	const { showMessage } = useMessageContext();
	const { user } = useAuthContext();

	const [lists, setLists] = useState([]);
	const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);

	//Usaremos alias para identificar que métodos son de una tabla y que métodos de la otra.
	const {
		getAllByColumn,
		save: saveList,
		remove: removeList,
	} = useSupabaseCRUD("shoppingList");

	const {
		getAll: getAllProducts,
		save: saveProduct,
		remove: removeProduct,
	} = useSupabaseCRUD("shoppingList_products");

	const toggleShoppingList = () => {
		setIsShoppingListVisible(!isShoppingListVisible);
	};

	const getLists = async () => {
		//Añado igualmente aquí una comprobación para asegurarme de que el usuario está cargado.
		if (!user || !user.id) {
			showMessage("No se ha podido cargar el usuario.", "error");
			return;
		}
		try {
			const data = await getAllByColumn("id_owner", user.id);
			if (data) {
				setLists(data);
			} else {
				showMessage(
					"No se han podido obtener las listas de la compra.",
					"error",
				);
			}
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const saveShoppingList = async (list) => {
		if (list.name.trim() === "") {
			showMessage("El nombre de la lista no puede estar vacío.", "error");
			return;
		}

		try {
			const listReady = {
				...list,
				id_owner: user.id,
			};
			const data = await saveList(listReady);
			if (data) {
				setLists([...lists, data]);
				showMessage("Lista creada correctamente.", "ok");
			}
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const removeShoppingList = async (id) => {
		try {
			await removeList(id);
			const newLists = lists.filter((l) => l.id !== id);
			setLists(newLists);
			showMessage("Lista eliminada correctamente.", "ok");
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	useEffect(() => {
		if (user) {
			//no quiero que esta consulta se haga antes de que el usuario esté listo, así que lo que hago es esperar a que el usuario esté listo para hacer la consulta de las listas, de esta forma evito errores por intentar hacer una consulta con un id de usuario vacío o nulo.
			getLists();
		}
	}, [user]);

	const dataProvider = {
		getLists,
		saveShoppingList,
		toggleShoppingList,
		lists,
		isShoppingListVisible,
	};
	return (
		<ShoppingListContext.Provider value={dataProvider}>
			{children}
		</ShoppingListContext.Provider>
	);
};
export default ShoppingListProvider;
export { ShoppingListContext };
