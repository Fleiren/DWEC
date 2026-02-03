import { createContext, useState, useEffect } from "react";
import useMessageContext from "../hooks/useMessageContext.js";
import useSupabaseCRUD from "../hooks/useSupabaseCRUD.js";
const productContext = createContext();

const ProductProvider = ({ children }) => {
	const emptyProduct = {
		name: "",
		description: "",
		price: null,
		weight: null,
		image: "",
	};
	const [selectedProduct, setSelectedProduct] = useState(emptyProduct);
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	//Lo hago ya aunque no lo vaya a usar todavía porque seguro que lo voy a necesitar.
	const [isFiltered, setIsFiltered] = useState(false);

	const { showMessage } = useMessageContext();
	const { loading, getAll, getById, save, edit, remove } =
		useSupabaseCRUD("products");

	const listProducts = async () => {
		try {
			const response = await getAll();
			if (response) {
				setProducts(response);
				//Se inicializa también la lista de productos filtrados con todos los productos.
				setFilteredProducts(response);
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
			await save(product);
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const updateProduct = async (product) => {
		try {
			await edit(product);
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const removeProduct = async (id) => {
		try {
			await remove(id);
			removeItem(id);
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
	const filterProductName = (name) => {
		if (name === "") {
			setFilteredProducts([...products]);
		} else {
			const filtered = [...products].filter((product) => {
				return product.name.toLowerCase().startsWith(name.toLowerCase());
			});
			setFilteredProducts(filtered);
			setIsFiltered(true);
		}
	};

	const filterProductPriceWeight = (type, number) => {
		//Me estaba dando error porque lo recibo como un string y se me había olvidado eso.
		if (number === "") {
			setFilteredProducts([...products]);
		} else {
			const numberValue = Number.parseFloat(number);
			const filtered = [...products].filter((product) => {
				return product[type] <= numberValue;
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
		setFilteredProducts([...products]);
		setIsFiltered(false);
	};

	//Estos métodos de aquí estoy pensando en llevarlos a un archivo estilo util.js pero no se si sería demasiada modularización para algo sencillo como un map...
	//incluso estoy pensando que al ser una sola línea, no haría falta que estuviera en un método a parte.

	const addItem = (item) => {
		setProducts([...products, item]);
	};

	const removeItem = (id) => {
		const newList = products.filter((p) => p.id != id);
		setProducts(newList);
	};

	const updateItem = (item) => {
		const newList = products.map((p) => (p.id === item.id ? item : p));
		setProducts(newList);
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
		findProductById,
		createProduct,
		updateProduct,
		removeProduct,
		filterProducts,
		orderProducts,
		clearFilter,
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
