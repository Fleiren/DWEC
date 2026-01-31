import "./product.css";
import { formatCurrency, formatNumberEs } from "../utils/formatters.js";

const Product = ({ product }) => {
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
		</div>
	);
};
export default Product;
