import "./shoppingListDetails.css";
import { useEffect } from "react";
import ShoppingListProduct from "./ShoppingListProduct.jsx";
import useShoppingListContext from "../hooks/useShoppingListContext.js";
const ShoppingListDetails = ({ list, goBack }) => {
	const { productsFromActualList, getProductsFromList } =
		useShoppingListContext();

	//Cuando se carga el componente, se hace una consulta para obtener los productos de la lista seleccionada, de esta forma evitamos que se muestren los productos de la lista anterior mientras se hace la consulta.
	useEffect(() => {
		getProductsFromList(list.id);
	}, [list.id]);
	return (
		<div>
			<button onClick={goBack}>Volver</button>
			<h3>{list.name}</h3>
			{productsFromActualList && productsFromActualList.length > 0 ? (
				productsFromActualList.map((product) => (
					<ShoppingListProduct key={product.id_product} product={product} />
				))
			) : (
				<p>No hay productos en esta lista.</p>
			)}
		</div>
	);
};

export default ShoppingListDetails;
