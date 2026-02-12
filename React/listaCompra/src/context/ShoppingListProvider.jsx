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
	const [productsFromActualList, setProductsFromActualList] = useState([]);
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
		updateBy2Column: updateProductBy2Column,
		removeBy2Column: removeProductBy2Column,
		getMultitable: getProductsFromMultipleTables,
		multitableBy2Column: getSingleProductFromMultipleTables,
		loading: loadingProducts,
	} = useSupabaseCRUD("shoppingList_products");

	const toggleShoppingList = () => {
		setIsShoppingListVisible(!isShoppingListVisible);
	};

	const clearSelectedList = () => {
		setSelectedList(null);
		setProductsFromActualList([]);
	};

	const getListById = (id) => {
		const selected = lists.find((list) => list.id === id);
		if (selected) {
			setSelectedList(selected);
		} else {
			showMessage("No se ha podido cargar la lista seleccionada.", "error");
		}
	};

	//Esto lo he copiado de la IA porque no entiendo que estoy haciendo tan mal como para tener un lag tan grande, igual al hacer lo del carrito me he liado mucho porque comprobaba todo el rato que lista estaba seleccionada ya que el estado no se guardaba al momento y me daba errores... al final lo mejor ha sido esto, cargar tordos los datos nada más empezar.
	const getInitialData = async () => {
		if (user) {
			const loadLists = await getLists();
			if (loadLists) {
				const cartList = loadLists.find(
					(l) => l.name.toLowerCase() === "carrito",
				);
				//Básicamente lo que hacemos aquí es tener todos los datos ya cargados para evitar llamadas a la api cada vez que le doy a los botones.
				if (cartList) {
					setSelectedList(cartList);
					await getProductsFromList(cartList.id);
				}
			}
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
				return data;
			}
		} catch (error) {
			showMessage(error.message, "error");
			return null;
			//Necesito retornar porque en el código donde se llama necesito comprobar de alguna manera si se ha creado el objeto.
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

	const removeProductFromList = async (listId, productId) => {
		try {
			//Creamos un objeto con la información que necesita la base de datos.
			const itemToRemove = {
				id_shoppingList: listId,
				id_product: productId,
			};
			await removeProductBy2Column(
				"id_shoppingList",
				"id_product",
				itemToRemove,
			);
			//Actualizamos el estado.
			const newProducts = productsFromActualList.filter(
				(p) => p.id_product !== productId,
			);
			setProductsFromActualList(newProducts);
			showMessage("Producto eliminado de la lista.", "ok");
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	//Este método sirve para actualizar la lista de la compra al momento si se ha borrado un producto desde la interfaz ya que para que se actualice necesito recargar la página y yo quiero qye sea al momento.
	const removeProductFromLocal = async (idProduct) => {
		//Solo se hará si hay una lista seleccionada en ese momento que es cuando quiero que se actualice en el momento.
		if (productsFromActualList && productsFromActualList.length > 0) {
			const newProducts = productsFromActualList.filter(
				(product) => product.id_product !== idProduct,
			);
			setProductsFromActualList(newProducts);
		}
	};

	const getProductsFromList = async (id) => {
		try {
			const data = await getProductsFromMultipleTables(
				"id_shoppingList",
				id,
				"id_shoppingList, id_product, amount, products(name, image, id, price, weight)",
			);
			//Hago los return porque necesito los datos desde esta llamada y no desde el estado, ya que me da error cuando quiero depender del estado porque no se actualiza al momento.
			if (data) {
				setProductsFromActualList(data);
				return data;
			}
			setProductsFromActualList([]);
			return [];
		} catch (error) {
			showMessage(error.message, "error");
			setProductsFromActualList([]);
			return null;
		}
	};

	const getOrCreateCart = async (currentLists) => {
		let cart = currentLists.find((l) => l.name.toLowerCase() === "carrito");
		if (!cart) {
			cart = await saveShoppingList({ name: "Carrito" });
		}
		return cart;
	};

	//He hecho este método 50.000 veces ya, no entiendo como puedo tener tantos problemas con esto.
	const addProductToShoppingList = async (productId, amount = 1) => {
		//Esta función se encarga de buscar a que lista se va a añadir el producto ya que en caso de que el usuario sea un vago no quiero que no compre nada en mi web asi que se generaría una lisat "carrito" por defecto.
		//Voy a explicar bien este código proque creo que es un poco lioso y quiero entenderlo cuando lo vuleva a ver (bueno, estoy escribiendo esto y aún no me hge puesto a escribir pero lo veo venir).
		let listToUse = selectedList;
		//Como sigo con errores por culpa del estado voy a probar a usar una variable temporal.
		let productsInList = [];
		//Si el usuario no ha seleccionado ninguna lista, voy a mirar si ya tiene generada la que es por defecto.
		if (!listToUse) {
			const currentLists = lists.length > 0 ? lists : await getLists();
			listToUse = await getOrCreateCart(currentLists);
			if (!listToUse) {
				showMessage("Error: No se pudo cargar el carrito.", "error");
				return;
			}
			setSelectedList(listToUse);
			//Con esto ya he aprendido la lección de que no debo usar un estado en la misma función donde lo modifico.
			productsInList = await getProductsFromList(listToUse.id);
		} else {
			productsInList = productsFromActualList;
		}

		//Para que se muestre el sidebar con la lista seleccionada y sus productos.
		if (!isShoppingListVisible) {
			setIsShoppingListVisible(true);
		}

		const productExists = productsInList.find(
			(p) => p.id_product === productId,
		);

		if (productExists) {
			await updateAmount(productExists, amount);
		} else {
			await addNewProduct(listToUse.id, productId, amount);
		}
	};

	//Al final no he usado este método porque me generaba un lag brutal, la verdad que estoy teniendo muchos problemas con el lag y por eso no he enviado la práctica a tiempo.
	const getSingleProductFromList = async (listId, productId) => {
		try {
			//No se porque pero se me hace más comodo trabajar con objetos que con strings sueltos, siento que el método genérico es más cómodo.
			const dataProduct = {
				id_shoppingList: listId,
				id_product: productId,
			};
			const data = await getSingleProductFromMultipleTables(
				"id_shoppingList",
				"id_product",
				dataProduct,
				"id_shoppingList, id_product, amount, products(name, image, id, price, weight)",
			);
			if (data) {
				return data;
			}
		} catch (error) {
			showMessage(error.message, "error");
			return null;
		}
	};

	//No te haces una idea del monstruo de método que tenía para añadir productos con el lío de la lista y de modificar las cantidades, tenía unas 72 líneas así que lo he separado en varios métodos.
	//Por defecto la cantidad es 1 ya que quiero que si el usuario añade el producto por primera vez no le salga cuantos añadir, si no que luego el botón de añadir cambia con el número que ya hay en el carrito y si van sumando, no quiero que el usuario me indique ya un total pero lo dejo por defecto por si en algún momento decido pasarlo por parámetro.

	const addNewProduct = async (listId, productId, amount = 1) => {
		const newProduct = {
			id_shoppingList: listId,
			id_product: productId,
			amount: amount,
		};

		const finalProduct = await saveProduct(newProduct);
		if (finalProduct) {
			//Si el producto se ha guardado correctamente traemos todos los productos de la lista para actualizar el estado.
			await getProductsFromList(listId);
			showMessage("Producto añadido a la lista.", "ok");
		} else {
			showMessage("No se ha podido añadir el producto a la lista.", "error");
		}
	};

	const updateAmount = async (product, amountToAdd) => {
		//Calculamos la cantidad actualizada, la que debemos modificar.
		const newAmount = product.amount + amountToAdd;
		//Si la cantidad es 0, entendemos que el usuario quiere eliminar el producto de la lista por lo que lo eliminamos.
		try {
			if (newAmount <= 0) {
				await removeProductFromList(
					product.id_shoppingList,
					product.id_product,
				);
				return;
			}

			const productUpdated = {
				id_shoppingList: product.id_shoppingList,
				id_product: product.id_product,
				amount: newAmount,
			};

			//Actualizamos la base de datos con la nueva cantidad.
			await updateProductBy2Column(
				"id_shoppingList",
				"id_product",
				productUpdated,
			);
			//Actualizamos el estado con la nueva cantidad.
			const newProducts = productsFromActualList.map((p) => {
				if (p.id_product === product.id_product) {
					return { ...p, amount: newAmount };
				}
				return p;
			});
			setProductsFromActualList(newProducts);
		} catch (error) {
			showMessage(error.message, "error");
		}
	};
	useEffect(() => {
		if (user) {
			getInitialData();
		} else {
			//Si el usuario cierra sesión reiniciamos todos los datos.
			setLists([]);
			setSelectedList(null);
			setProductsFromActualList([]);
			setIsShoppingListVisible(false);
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
		addProductToShoppingList,
		removeShoppingList,
		removeProductFromList,
		updateAmount,
		removeProductFromLocal,
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
