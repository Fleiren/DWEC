import "./product.css";

const Product = ({ product }) => {
	return (
		<>
			<div className="product_card">
				<h3>{product.name}</h3>
				<p>{product.weight}</p>
				<p>{product.price}</p>
			</div>
		</>
	);
};
export default Product;
