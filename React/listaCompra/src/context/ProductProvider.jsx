import { createContext, useState, useEffect } from "react";
import useMessage from "../hooks/useMessage.js";
import useSupabaseProduct from "./../hooks/useSupabaseProduct.js";
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
	const [isFiltered, setIsFiltered] = useState(false);

	const { showMessage } = useMessage();
	const { loading, getProducts, getProductById, saveProduct, editProduct } =
		useSupabaseProduct();

	const listProducts = async () => {
		try {
			const response = await getProducts();
			if (response) {
				setProducts(response);
			} else {
				showMessage("No se han podido obtener los productos.", "error");
			}
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const findProductById = async (id) => {
		try {
			const response = await getProductById(id);
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
			await saveProduct(product);
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const updateProduct = async (product) => {
		try {
			await editProduct(product);
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
			setIsFiltered(false);
		} else {
			const filtered = products.filter((product) => {
				return product.name.toLowerCase().startsWith(name.toLowerCase());
			});
			setFilteredProducts(filtered);
			setIsFiltered(true);
		}
	};

	const filterProductPriceWeight = (type, number) => {
		//Me estaba dando error porque lo recibo como un string y se me había olvidado eso.
		const numberValue = Number(number);
		if (numberValue === 0) {
			setIsFiltered(false);
		} else {
			const filtered = products.filter((product) => {
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
			default:
				break;
		}
	};

	const orderProductName = () => {
		const ordered = [...products].sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
		setFilteredProducts(ordered);
		setIsFiltered(true);
	};

	const orderProductPriceWeight = (type) => {
		const ordered = [...products].sort((a, b) => {
			return a[type] - b[type];
		});
		setFilteredProducts(ordered);
		setIsFiltered(true);
	};

	const clearFilter = () => {
		setFilteredProducts([]);
		setIsFiltered(false);
	};

	useEffect(() => {
		listProducts();
	}, []);

	const dataProvider = {
		selectedProduct,
		products,
		filteredProducts,
		isFiltered,
		findProductById,
		createProduct,
		updateProduct,
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
