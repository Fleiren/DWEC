import { createContext, useState, useEffect } from "react";
import useMessageContext from "../hooks/useMessageContext.js";
import useSupabaseCRUD from "../hooks/useSupabaseCRUD.js";
import { cleanNumber } from "../utils/formatters.js";
const productContext = createContext();

const ProductProvider = ({ children }) => {
	const emptyProduct = {
		name: "",
		description: "",
		price: "",
		weight: "",
		image: "",
		category: "books",
	};

	//Este estado irá en otro contexto en la siguiente práctica ya implementaré la lista de la compra de forma completa, lo coloco aquí por tener ya la lógica porque no me da tiempo a hacer todo el otro contexto.
	const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);

	const toggleShoppingList = () => {
		setIsShoppingListVisible(!isShoppingListVisible);
	};

	const [activeCategory, setActiveCategory] = useState("books");
	const [selectedProduct, setSelectedProduct] = useState(emptyProduct);
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	//Lo hago ya aunque no lo vaya a usar todavía porque seguro que lo voy a necesitar.
	const [isFiltered, setIsFiltered] = useState(false);

	const { showMessage } = useMessageContext();
	const { loading, getAll, getById, save, edit, remove } =
		useSupabaseCRUD("products");

	//Estos dos métodos son para evitar utilizar el setter fuera del contexto, ahora hace lo mismo pero entiendo que la estructura debe ser esta aunque ahora no haya ninguna validación.
	const updateSelectedProduct = (product) => {
		setSelectedProduct(product);
	};

	const resetSelectedProduct = () => {
		setSelectedProduct(emptyProduct);
	};

	const changeCategory = (category) => {
		setActiveCategory(category);
		const newFiltered = products.filter((p) => p.category === category);
		setFilteredProducts(newFiltered);
	};
	const listProducts = async () => {
		try {
			const response = await getAll();
			if (response) {
				setProducts(response);
				//Se inicializa también la lista de productos filtrados con todos los productos de la categoría libros ya que son los que quiero que se muestren por defecto.
				//Filtro directamente la respuesta porque si no, cuando recargo la página no se cargan los productos.
				const newFiltered = response.filter((p) => p.category === "books");
				setFilteredProducts(newFiltered);
			} else {
				showMessage("No se han podido obtener los productos.", "error");
			}
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const findProductById = async (id) => {
		try {
			const response = await getById(id);
			if (response) {
				setSelectedProduct(response);
			} else {
				showMessage(
					"No se ha podido obtener el producto seleccionado.",
					"error",
				);
			}
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const createProduct = async (product) => {
		try {
			const newProduct = await save(product);
			const newList = [...products, newProduct];
			setProducts(newList);
			setFilteredProducts(newList.filter((p) => p.category === activeCategory));
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const updateProduct = async (product) => {
		try {
			await edit(product);
			//Actualizamos también los estados.
			const newList = [...products].map((p) =>
				p.id === product.id ? product : p,
			);
			setProducts(newList);
			setFilteredProducts(newList.filter((p) => p.category === activeCategory));
			showMessage("El producto se ha editado con éxito.", "ok");
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const removeProduct = async (id) => {
		try {
			await remove(id);
			const newList = products.filter((p) => p.id !== id);
			setProducts(newList);
			setFilteredProducts(newList.filter((p) => p.category === activeCategory));
			showMessage("Se ha borrado el producto con éxito.", "ok");
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const filterProducts = (type, value) => {
		switch (type) {
			case "name":
				filterProductName(value);
				break;
			case "price":
			case "weight":
				filterProductPriceWeight(type, value);
				break;
			default:
				break;
		}
	};

	//¿¿Que me estoy liando con esto de las categorías?? Sí, lo se.
	const filterProductName = (name) => {
		if (name === "") {
			setFilteredProducts(
				[...products].filter((product) => product.category === activeCategory),
			);
		} else {
			const filtered = [...products].filter((product) => {
				return (
					product.category === activeCategory &&
					product.name.toLowerCase().startsWith(name.toLowerCase())
				);
			});
			setFilteredProducts(filtered);
			setIsFiltered(true);
		}
	};

	const filterProductPriceWeight = (type, number) => {
		//Me estaba dando error porque lo recibo como un string y se me había olvidado eso.
		if (number === "") {
			setFilteredProducts(
				[...products].filter((product) => product.category === activeCategory),
			);
		} else {
			const numberValue = Number.parseFloat(number);
			const filtered = [...products].filter((product) => {
				return (
					product.category === activeCategory && product[type] <= numberValue
				);
			});
			setFilteredProducts(filtered);
			setIsFiltered(true);
		}
	};

	const orderProducts = (type, value) => {
		switch (type) {
			case "name":
				orderProductName();
				break;
			case "price":
			case "weight":
				orderProductPriceWeight(type, value);
				break;
			case "":
				//Sin orden, vuelvo a la lista original.
				setFilteredProducts([...products]);
			default:
				break;
		}
	};

	const orderProductName = () => {
		const ordered = [...filteredProducts].sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
		setFilteredProducts(ordered);
	};

	const orderProductPriceWeight = (type) => {
		const ordered = [...filteredProducts].sort((a, b) => {
			return a[type] - b[type];
		});
		setFilteredProducts(ordered);
	};

	const clearFilter = () => {
		setFilteredProducts(
			[...products].filter((p) => p.category === activeCategory),
		);
		setIsFiltered(false);
	};

	const updateDataProduct = (evento) => {
		const { name, value } = evento.target;
		if (name) {
			setSelectedProduct({ ...selectedProduct, [name]: value });
		}
	};

	const validateProduct = () => {
		//He agrupado los errores para que los mensajes sean un poco más genéricos, se que se podría hacer mejor.
		//He hecho un return en cada condición porque no se si es buena práctica que el proveedor navegue a otras páginas,
		//ya que tenía pensado hacer muchos if, else if y que si entra al último else (todo ha salido bien) a parte de guardar navegue directamente a la lista,
		//pero al final, como luego en añadir producto no voy directamente a la lista (y no se si es buena práctica que un proveedor maneje navegaciones) lo he dejado como que indica si ha funcionado o no.

		//Cambiamos las "," a "." para que la base de datos no falle ya que da error si intentamos registrar datos con ",".

		const weight = cleanNumber(selectedProduct.weight);
		const price = cleanNumber(selectedProduct.price);
		if (
			!selectedProduct.name ||
			!selectedProduct.name.trim() ||
			!selectedProduct.weight ||
			!selectedProduct.price
		) {
			showMessage("Los campos obligatorios no pueden estar vacíos.", "error");
			return null;
		}

		if (isNaN(weight) || isNaN(price)) {
			showMessage("Los campos precio y peso deben ser números", "error");
			return null;
		}

		if (weight <= 0 || price <= 0) {
			showMessage(
				"Los campos precio y peso deben ser números positivos, mayores a 0",
				"error",
			);
			return null;
		}
		const productReady = { ...selectedProduct, weight: weight, price: price };

		return productReady;
	};

	useEffect(() => {
		listProducts();
	}, []);

	const dataProvider = {
		selectedProduct,
		products,
		filteredProducts,
		isFiltered,
		loading,
		isShoppingListVisible,
		activeCategory,
		updateSelectedProduct,
		resetSelectedProduct,
		findProductById,
		createProduct,
		updateProduct,
		removeProduct,
		filterProducts,
		orderProducts,
		clearFilter,
		updateDataProduct,
		validateProduct,
		toggleShoppingList,
		changeCategory,
	};
	return (
		<>
			<productContext.Provider value={dataProvider}>
				{children}
			</productContext.Provider>
		</>
	);
};

export { productContext };
export default ProductProvider;
