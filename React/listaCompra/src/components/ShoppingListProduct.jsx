import "./shoppingListProduct.css";
import useShoppingListContext from "../hooks/useShoppingListContext.js";
import trashIcon from "../assets/img/trash.png";
//Quería reutilizar el componente Product pero no puedo ya que el diseño y el contenido no es del todo igual por lo que me ha tocado crear otro componente para mostrar los productos de la lista pero con menos iformación.
const ShoppingListProduct = ({ product }) => {
	const { removeProductFromList, updateAmount } = useShoppingListContext();
	const { name, image } = product.products;
	const { amount, id_shoppingList, id_product } = product;

	return (
		<div className="shopping_list_item_card">
			<div className="shopping_list_item_img_container">
				<img src={image} alt={name} />
			</div>
			<div className="item_info">
				<p className="item_name">{name}</p>
				<div className="quantity">
					<button
						className="btn_amount"
						onClick={() => updateAmount(product, -1)}
					>
						-
					</button>
					<span className="amount_text">{amount}</span>
					<button
						className="btn_amount"
						onClick={() => updateAmount(product, 1)}
					>
						+
					</button>
				</div>
			</div>

			<button
				className="btn_delete_item"
				onClick={() => removeProductFromList(id_shoppingList, id_product)}
				title="Eliminar producto"
			>
				<img src={trashIcon} alt="Eliminar" style={{ width: "20px" }} />
			</button>
		</div>
	);
};

export default ShoppingListProduct;
