import { createContext, useState } from "react";
import useAuthContext from "../hooks/useAuthContext.js";
const ShoppingListContext = createContext();
const ShoppingListProvider = () => {
	const [lists, setLists] = useState([]);
	const { user } = useAuthContext();

	//Usaremos alias para identificar que métodos son de una tabla y que métodos de la otra.
	const dataProvider = {};
	return (
		<ShoppingListContext.Provider value={dataProvider}>
			{children}
		</ShoppingListContext.Provider>
	);
};
export default ShoppingListProvider;
export { ShoppingListContext };
