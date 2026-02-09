import { createContext, useState } from "react";
import useAuthContext from "../hooks/useAuthContext.js";
import useSupabaseCRUD from "../hooks/useSupabaseCRUD.js";
import useMessageContext from "../hooks/useMessageContext.js";
const ShoppingListContext = createContext();
const ShoppingListProvider = ({ children }) => {
	const { showMessage } = useMessageContext();
	const [lists, setLists] = useState([]);
	const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);
	const toggleShoppingList = () => {
		setIsShoppingListVisible(!isShoppingListVisible);
	};
	const { user } = useAuthContext();
	const initialList = {
		name: "",
		id_owner: user.id,
	};
	const [selectedList, setSelectedList] = useState(initialList);

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

	const getLists = async () => {
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
		try {
			const data = await saveList(list);
			setLists([...lists, data]);
			showMessage("Lista creada correctamente.", "ok");
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
	const validateShoppingList = () => {
		if (!selectedList.name) {
			showMessage("El nombre de la lista es obligatorio.", "error");
			return null;
		}

		return selectedList;
	};
	const dataProvider = {
		getLists,
		saveShoppingList,
		validateShoppingList,
		toggleShoppingList,
		lists,
		selectedList,
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
