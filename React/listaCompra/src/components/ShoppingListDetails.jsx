import "./shoppingListDetails.css";
import { useEffect, useState } from "react";
import ShoppingListProduct from "./ShoppingListProduct.jsx";
import useShoppingListContext from "../hooks/useShoppingListContext.js";
import useMessageContext from "../hooks/useMessageContext.js";
import ShopingListMenu from "./menu/submenu/shoppingListMenu.jsx";
import LoadingMini from "./LoadingMini.jsx";
import Confirm from "./Confirm.jsx";
const ShoppingListDetails = ({ list, goBack }) => {
	const {
		productsFromActualList,
		getProductsFromList,
		removeShoppingList,
		loadingProducts,
	} = useShoppingListContext();
	const { showMessage } = useMessageContext();
	const [showConfirm, setShowConfirm] = useState(false);

	const deleteListConfirm = () => {
		setShowConfirm(true);
	};
	const deleteList = () => {
		if (productsFromActualList && productsFromActualList.length > 0) {
			showMessage(
				"Aún tienes productos en la lista, elimínalos antes de eliminar la lista.",
				"error",
			);
			setShowConfirm(false);
			return;
		} else {
			removeShoppingList(list.id);
			setShowConfirm(false);
			goBack();
		}
	};
	const cancelDelete = () => {
		setShowConfirm(false);
	};
	//Cuando se carga el componente, se hace una consulta para obtener los productos de la lista seleccionada, de esta forma evitamos que se muestren los productos de la lista anterior mientras se hace la consulta.
	useEffect(() => {
		getProductsFromList(list.id);
	}, [list.id]);
	return (
		<div>
			<div className="header_actions">
				<button onClick={goBack}>Volver</button>
				<button className="btn_delete_list" onClick={deleteListConfirm}>
					Eliminar lista
				</button>
			</div>

			<h3>{list.name}</h3>
			{/**Con esta comprobación solo mostraré el loading cuando se haya cargado la lista por primera vez ya que el tema de agregar producto y tal desde la lista no quiero que sea con parpadeos. */}
			{loadingProducts && productsFromActualList.length === 0 ? (
				<div className="loading-container">
					<LoadingMini />
				</div>
			) : (
				<>
					<ShopingListMenu />
					{productsFromActualList && productsFromActualList.length > 0 ? (
						productsFromActualList.map((product) => (
							<ShoppingListProduct key={product.id_product} product={product} />
						))
					) : (
						<p>No hay productos en esta lista.</p>
					)}
					{showConfirm && (
						<Confirm
							mensaje={`¿Estás seguro de que quieres eliminar la lista ${list.name}?`}
							accionAceptar={deleteList}
							accionCancelar={cancelDelete}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default ShoppingListDetails;
