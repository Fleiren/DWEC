import "./product.css";

const Product = ({ product }) => {
	return (
		<>
			<div className="product_card">
				<h3>{product.name}</h3>
			</div>
		</>
	);
};
export default Product;
