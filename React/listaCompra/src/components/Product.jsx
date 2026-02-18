import "./product.css";
import { formatCurrency, formatNumberEs } from "../utils/formatters.js";
import imageTrash from "../assets/img/trash.png";
import imageEdit from "../assets/img/edit2.png";
import useAuthContext from "../hooks/useAuthContext.js";
import useShoppingListContext from "../hooks/useShoppingListContext.js";

const Product = ({ product }) => {
	const { isAuthenticated, adminIsActive, isAdmin } = useAuthContext();
	const { selectedList } = useShoppingListContext();
	return (
		<div className="product_card">
			<h3>{product.name}</h3>
			<div className="product_img_container">
				<img src={product.image} alt={product.name} />
			</div>
			<div className="product_info">
				<p>
					<strong>Peso:</strong> {formatNumberEs(product.weight)} Kg
				</p>
				<p className="price_tag">{formatCurrency(product.price)}</p>
			</div>
			{isAuthenticated && adminIsActive && isAdmin && (
				<div className="options_img">
					<input
						type="image"
						src={imageTrash}
						id="delete"
						name="delete"
						value={product.id}
					/>

					<input
						type="image"
						src={imageEdit}
						id="edit"
						name="edit"
						value={product.id}
					/>
				</div>
			)}
			{!adminIsActive && isAuthenticated && (
				<button className="add_button" data-id={product.id}>
					{selectedList
						? //Me he mareado un poco con este diseño pero le estoy dando muchas vueltas para que sea intuitivo.
							//Lo que voy a hacer es que si el usuario no ha seleccionado ninguna lista que al darle a añadir se cree una lista por defecto llamada carrito, para los usuarios más vagos que solo quieren comprar y ya.
							`+ Añadir a ${selectedList.name}`
						: `+ Añadir al carrito`}
				</button>
			)}
		</div>
	);
};
export default Product;
