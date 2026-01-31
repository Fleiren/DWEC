import { useContext } from "react";
import { productContext } from "../context/ProductProvider.jsx";
const useProductContext = () => {
	const context = useContext(productContext);
	if (!context) {
		throw new Error(
			"Para poder usar el hook de productos debe estar el componente englobado por el contexto ProductProvider",
		);
	}
	return context;
};

export default useProductContext;
