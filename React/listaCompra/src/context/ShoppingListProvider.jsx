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
	const [productsFromActualList, setProductsFromActualList] = useState(null);
	const [selectedList, setSelectedList] = useState(null);

	//Usaremos alias para identificar que métodos son de una tabla y que métodos de la otra.
	const {
		getAllByColumn: getAllLists,
		save: saveList,
		remove: removeList,
		loading: loadingLists,
	} = useSupabaseCRUD("shoppingList");

	const {
		getAllByColumn: getAllProducts,
		save: saveProduct,
		remove: removeProduct,
		getMultitable: getProductsFromMultipleTables,
		loading: loadingProducts,
	} = useSupabaseCRUD("shoppingList_products");

	const toggleShoppingList = () => {
		setIsShoppingListVisible(!isShoppingListVisible);
	};

	const clearSelectedList = () => {
		setSelectedList(null);
		setProductsFromActualList(null);
	};

	const getListById = (id) => {
		const selected = lists.find((list) => list.id === id);
		if (selected) {
			setSelectedList(selected);
		} else {
			showMessage("No se ha podido cargar la lista seleccionada.", "error");
		}
	};

	const getLists = async () => {
		//Añado igualmente aquí una comprobación para asegurarme de que el usuario está cargado.
		if (!user || !user.id) {
			showMessage("No se ha podido cargar el usuario.", "error");
			return;
		}
		try {
			const data = await getAllLists("id_owner", user.id);
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

	const getProductsFromList = async (id) => {
		try {
			const data = await getProductsFromMultipleTables(
				"id_shoppingList",
				id,
				"id_product, amount, products(name, image, id, price, weight)",
			);
			console.log(data);
			if (data) {
				setProductsFromActualList(data);
			}
		} catch (error) {
			showMessage(error.message, "error");
			setProductsFromActualList([]);
		}
	};

	useEffect(() => {
		if (user) {
			//no quiero que esta consulta se haga antes de que el usuario esté listo, así que lo que hago es esperar a que el usuario esté listo para hacer la consulta de las listas, de esta forma evito errores por intentar hacer una consulta con un id de usuario vacío o nulo.
			getLists();
		}
	}, [user]);

	//No me convence lo de tener dos loadig.
	const dataProvider = {
		getLists,
		saveShoppingList,
		toggleShoppingList,
		getProductsFromList,
		getListById,
		clearSelectedList,
		productsFromActualList,
		lists,
		isShoppingListVisible,
		selectedList,
		loadingLists,
		loadingProducts,
	};
	return (
		<ShoppingListContext.Provider value={dataProvider}>
			{children}
		</ShoppingListContext.Provider>
	);
};
export default ShoppingListProvider;
export { ShoppingListContext };
