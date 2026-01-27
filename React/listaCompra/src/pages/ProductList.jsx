import useProduct from "./../hooks/useProduct.js";
import Product from "./../components/Product.jsx";
const ProductList = () => {
	const { products } = useProduct();

	return (
		<>
			<h1>Lista de Libros</h1>
			{products.map((product) => {
				return <Product key={product.id} product={product} />;
			})}
		</>
	);
};

export default ProductList;
