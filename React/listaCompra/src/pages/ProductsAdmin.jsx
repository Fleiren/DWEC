import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductContext from "./../hooks/useProductContext.js";
import Product from "./../components/Product.jsx";
import useAuthContext from "../hooks/useAuthContext.js";
import Loading from "./../components/Loading.jsx";
import useShoppingListContext from "../hooks/useShoppingListContext.js";
import Confirm from "../components/Confirm.jsx";
import "./productList.css";

const ProductsAdmin = () => {
	const { filteredProducts, loading, removeProduct } = useProductContext();
	const { removeProductFromLocal } = useShoppingListContext();
	const { isAuthenticated, isAdmin } = useAuthContext();
	const [showConfirm, setShowConfirm] = useState(false);
	//Veo esto un poco chapuza, creo que se podría arreglar el confirm o algo para recibir id.
	const [idSelectedProduct, setIdSelectedProduct] = useState("");
	const nv = useNavigate();
	const productOptions = (evento) => {
		if (evento.target.name === "delete") {
			setShowConfirm(true);
			//Guardamos la id en un estado para tener acceso a ella si el usuario decide eliminar el producto.
			setIdSelectedProduct(evento.target.value);
		}
		if (evento.target.name === "edit") {
			nv(`/editProduct/${evento.target.value}`);
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
	return (
		<>
			{isAdmin && isAuthenticated ? (
				<div className="product_list_container">
					<h1>Lista de Productos</h1>
					{loading ? (
						<Loading />
					) : (
						<>
							{/**Lo siento, los nombres de las clases me los ha dado la IA por tema de diseño. */}
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
						</>
					)}
				</div>
			) : (
				<h1>NO ERES ADMIN</h1>
			)}
		</>
	);
};

export default ProductsAdmin;
