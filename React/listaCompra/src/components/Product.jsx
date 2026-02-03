import "./product.css";
import { formatCurrency, formatNumberEs } from "../utils/formatters.js";
import imageTrash from "../assets/img/trash.png";
import imageEdit from "../assets/img/edit2.png";
import useAuthContext from "../hooks/useAuthContext.js";

const Product = ({ product }) => {
	const { isAuthenticated } = useAuthContext();
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
			{isAuthenticated && (
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
		</div>
	);
};
export default Product;
