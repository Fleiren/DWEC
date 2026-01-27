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

	const { showMessage } = useMessage();
	const { getProducts, getProductById, saveProduct, editProduct } =
		useSupabaseProduct();

	const listProducts = () => {
		try {
			const response = getProducts();
			if (response) {
				console.log(response);
				setProducts(response);
			} else {
				showMessage("No se han podido obtener los productos.", "error");
			}
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const findProductById = (id) => {
		try {
			const response = getProductById(id);
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

	const createProduct = (product) => {
		try {
			saveProduct(product);
		} catch (error) {
			showMessage(error.message, "error");
		}
	};

	const updateProduct = (product) => {
		try {
			editProduct(product);
		} catch (error) {
			showMessage(error.message, "error");
		}
	};
	useEffect(() => {
		listProducts();
	}, []);

	const dataProvider = {
		selectedProduct,
		products,
		filteredProducts,
		findProductById,
		createProduct,
		updateProduct,
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
