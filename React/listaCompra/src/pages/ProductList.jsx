import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductContext from "./../hooks/useProductContext.js";
import Product from "./../components/Product.jsx";
import FilterProductMenu from "../components/menu/submenu/FilterProductMenu.jsx";
import useAuthContext from "../hooks/useAuthContext.js";
import Loading from "./../components/Loading.jsx";
import { formatCurrency } from "../utils/formatters.js";
import useShoppingListContext from "../hooks/useShoppingListContext.js";
import Confirm from "../components/Confirm.jsx";
import "./productList.css";
import ShoppingLists from "../pages/ShoppingLists.jsx";
const ProductList = () => {
	const {
		filteredProducts,
		loading,
		removeProduct,
		activeCategory,
		changeCategory,
	} = useProductContext();
	const {
		isShoppingListVisible,
		addProductToShoppingList,
		removeProductFromLocal,
	} = useShoppingListContext();
	const { isAuthenticated } = useAuthContext();
	const [showConfirm, setShowConfirm] = useState(false);
	//Veo esto un poco chapuza, creo que se podría arreglar el confirm o algo para recibir id.
	const [idSelectedProduct, setIdSelectedProduct] = useState("");
	const nv = useNavigate();
	const calculateAverage = () => {
		let totalPrice = 0;
		filteredProducts.forEach((product) => {
			totalPrice += product.price;
		});

		return totalPrice / filteredProducts.length || 0;
	};
	const totalProducts = filteredProducts.length;

	const averagePrice = calculateAverage();

	const productOptions = (evento) => {
		if (evento.target.name === "delete") {
			setShowConfirm(true);
			//Guardamos la id en un estado para tener acceso a ella si el usuario decide eliminar el producto.
			setIdSelectedProduct(evento.target.value);
		}
		if (evento.target.name === "edit") {
			nv(`/editProduct/${evento.target.value}`);
		}

		if (evento.target.classList.contains("add_button")) {
			//En este método vamos a asignar la lista actual donde se van a guardar los productos y se encargará de llamar al método que lo guarda/actualiza.
			addProductToShoppingList(evento.target.dataset.id);
		}
	};

	const confirmDeleteProduct = () => {
		setShowConfirm(false);
		removeProduct(idSelectedProduct);
		removeProductFromLocal();
	};
	const closeConfirm = () => {
		setShowConfirm(false);
		setIdSelectedProduct("");
	};
	// Hay varias ternarias ya que el menú de filtros solo se muestra si el usuario está autenticado, si no se han cargado los productos se muestra el loading y si en las búsquedas no hay prductos se muestra un mensaje.
	return (
		<>
			{/**Esto de los nombres de las clases así usando lógica creo que es un poco pasarse pero lo estoy usando para que me funcione el diseño de la IA, a ver si me da tiempo a hacer yo todo el diseño para practicar, esq no me da tiempo a que quede bonito si lo hago yo todo :( . */}
			<div
				className={`layout_container ${isShoppingListVisible ? "with_sidebar" : ""}`}
			>
				<div className="product_list_container">
					<h1>Lista de Libros</h1>
					{loading ? (
						<Loading />
					) : (
						<>
							{/**Lo siento, los nombres de las clases me los ha dado la IA por tema de diseño. */}
							<div className="category_tabs">
								<button
									className={`tab_btn ${activeCategory === "books" ? "active" : ""}`}
									onClick={() => {
										changeCategory("books");
									}}
								>
									📚 Libros
								</button>
								<button
									className={`tab_btn ${activeCategory === "stationery" ? "active" : ""}`}
									onClick={() => {
										changeCategory("stationery");
									}}
								>
									✏️ Papelería
								</button>
							</div>
							{isAuthenticated && <FilterProductMenu />}
							{showConfirm && (
								<Confirm
									mensaje="¿Seguro que quieres borrar este producto?"
									accionAceptar={confirmDeleteProduct}
									accionCancelar={closeConfirm}
								/>
							)}
							<div className="product_list" onClick={productOptions}>
								{filteredProducts.length > 0 ? (
									filteredProducts.map((product) => {
										return <Product key={product.id} product={product} />;
									})
								) : (
									<h4>No hay productos disponibles.</h4>
								)}
							</div>
							<div className="product_details">
								<strong>
									Cantidad:
									<span className="stat_value"> {totalProducts}</span>
								</strong>
								<strong>
									Media de Precio:
									<span className="stat_value">
										{/**Se separa el espacio del método por culpa del prettier, cada vez que guardo se pone así automáticamente. */}{" "}
										{formatCurrency(averagePrice.toFixed(2))}
									</span>
								</strong>
							</div>
						</>
					)}
				</div>
				{isShoppingListVisible && <ShoppingLists />}
			</div>
		</>
	);
};

export default ProductList;
