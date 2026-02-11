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
		updateBy2Column: updateProductBy2Column,
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
		} catch (error) {
			showMessage(error.message, "error");
			setProductsFromActualList([]);
			return null;
		}
	};

	const addProductToShoppingList = async (productId) => {
		//Esta función se encarga de buscar a que lista se va a añadir el producto ya que en caso de que el usuario sea un vago no quiero que no compre nada en mi web asi que se generaría una lisat "carrito" por defecto.
		//Voy a explicar bien este código proque creo que es un poco lioso y quiero entenderlo cuando lo vuleva a ver (bueno, estoy escribiendo esto y aún no me hge puesto a escribir pero lo veo venir).
		let listToUse = selectedList;
		//Si el usuario no ha seleccionado ninguna lista, voy a mirar si ya tiene generada la que es por defecto.
		if (!listToUse) {
			let cartList = lists.find(
				(list) => list.name.toLowerCase() === "carrito",
			);
			//Si no tiene la lista por defecto la creamos y la guardamos.
			if (!cartList) {
				cartList = {
					name: "Carrito",
				};
				cartList = await saveShoppingList(cartList);
				if (!cartList) {
					showMessage(
						"No se ha podido crear la lista por defecto, no se ha añadido el producto a ninguna lista.",
						"error",
					);
					return;
				}
			}
			//Asignamos la lista que vamos a usar.
			listToUse = cartList;
		}
		//Igual esto solo debería hacerse en caso de no haber una lista ya seleccionada (dentro del if) pero bueno, así me aseguro de que haya una lista seleccionada.
		setSelectedList(listToUse);
		//Para que se muestre el sidebar con la lista seleccionada y sus productos.
		if (!isShoppingListVisible) {
			setIsShoppingListVisible(true);
		}
		//A este método lo llamaba desde el componente de lista de productos pero me daba error porque claro, al ser asíncrona no se actualizaba el estado de selectedList.
		//Sigo sin acordarme que si utilizo los estados para guardar la lista lo más probable es que sea null o undefined porque no se cargan en el momento.
		await addProduct(listToUse.id, productId);
		getProductsFromList(listToUse.id);
	};

	//Por defecto la cantidad es 1 ya que quiero que si el usuario añade el producto por primera vez no le salga cuantos añadir, si no que luego el botón de añadir cambia con el número que ya hay en el carrito y si van sumando, no quiero que el usuario me indique ya un total pero lo dejo por defecto por si en algún momento decido pasarlo por parámetro.
	const addProduct = async (listId, productId, amount = 1) => {
		try {
			const allProductsFromList = await getProductsFromList(listId);

			if (allProductsFromList) {
				const productExists = allProductsFromList.find(
					(p) => p.id_product === productId,
				);

				if (productExists) {
					const updatedProduct = {
						id_shoppingList: productExists.id_shoppingList,
						id_product: productExists.id_product,
						amount: productExists.amount + amount,
					};
					//No hay manera de que supabase me devuelva el objeto actualizado asi que me toca hacer otra llamada a la base de datos para obtener el objeto actualizado.
					await updateProductBy2Column(
						"id_shoppingList",
						"id_product",
						updatedProduct,
					);

					const finalProduct = await getProductsFromList(
						productExists.id_shoppingList,
					);

					if (finalProduct) {
						const newProducts = allProductsFromList.map((p) => {
							if (p.id_product === productId) {
								return { ...p, amount: finalProduct.amount };
							}
							return p;
						});

						setProductsFromActualList(newProducts);
						showMessage("Cantidad actualizada correctamente.", "ok");
					} else {
						showMessage(
							"Error: La base de datos no devolvió el registro actualizado.",
							"error",
						);
					}
				} else {
					const newProduct = {
						id_shoppingList: listId,
						id_product: productId,
						amount: amount,
					};

					const finalProduct = await saveProduct(newProduct);

					if (finalProduct) {
						await getProductsFromList(listId);
						showMessage("Producto añadido a la lista.", "ok");
					} else {
						showMessage(
							"No se ha podido añadir el producto a la lista.",
							"error",
						);
					}
				}
			} else {
				showMessage(
					"No se han podido acceder a los productos de la lista.",
					"error",
				);
			}
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

	//No me convence lo de tener dos loadig.
	const dataProvider = {
		getLists,
		saveShoppingList,
		toggleShoppingList,
		getProductsFromList,
		getListById,
		clearSelectedList,
		addProductToShoppingList,
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
