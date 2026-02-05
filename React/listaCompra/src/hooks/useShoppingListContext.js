import { useContext } from "react";
import { ShoppingListContext } from "../context/ShoppingListProvider.jsx";
const useShoppingListContext = () => {
	const context = useContext(ShoppingListContext);
	if (!context) {
		throw new Error(
			"Para utilizar el hook de la lista de la compra debe estar el componente englobado por el contexto ShoppingListProvider.",
		);
	}
	return context;
};

export default ShoppingListContext;
