import React from "react";
import "./shoppingListMenu.css";
import useShoppingListContext from "../../../hooks/useShoppingListContext.js";
import { formatCurrency, formatNumberEs } from "../../../utils/formatters.js";

const ShopingListMenu = () => {
	//Que importante es no olvidarse de hacer el loading cuando vas a utilizar un estado que se actualiza mediante una función asíncrona, madre mía, ya te digo yo que no se me vuelve a olvidar.
	const { productsFromActualList } = useShoppingListContext();

	//Que maravilla el reduce, cuanto tiempo sin usarlo.
	const totalPrice = productsFromActualList.reduce((acumulated, item) => {
		const price = item.products.price;
		const amount = item.amount;
		return acumulated + price * amount;
	}, 0);

	const totalWeight = productsFromActualList.reduce((acumulated, item) => {
		const weight = item.products?.weight || 0;
		const amount = item.amount;
		return acumulated + weight * amount;
	}, 0);

	const totalItems = productsFromActualList.reduce(
		(acumulated, item) => acumulated + item.amount,
		0,
	);
	return (
		productsFromActualList &&
		productsFromActualList.length > 0 && (
			<div className="shopping_list_menu">
				<h3>Resumen de la lista</h3>
				<p>Total de productos: {totalItems}</p>
				<p>Total peso: {formatNumberEs(totalWeight)} Kg</p>
				<p>Total precio: {formatCurrency(totalPrice)}</p>
				{totalWeight > 10 && (
					<p className="warning">
						El peso total de la lista supera los 10 Kg, es recomendable acudir
						en coche a por el pedido.
					</p>
				)}
			</div>
		)
	);
};

export default ShopingListMenu;
