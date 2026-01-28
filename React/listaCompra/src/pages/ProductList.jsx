import useProduct from "./../hooks/useProduct.js";
import Product from "./../components/Product.jsx";
import FilterProductMenu from "../components/menu/submenu/FilterProductMenu.jsx";
import useAuth from "../hooks/useAuth.js";
const ProductList = () => {
	const { products, filteredProducts } = useProduct();
	const { isAuthenticated } = useAuth();
	return (
		<>
			<div className="product_list_container">
				<h1>Lista de Libros</h1>
				{isAuthenticated && <FilterProductMenu />}
				<div className="product_lista">
					{filteredProducts.length > 0
						? filteredProducts.map((product) => {
								return <Product key={product.id} product={product} />;
							})
						: products.map((product) => {
								return <Product key={product.id} product={product} />;
							})}
				</div>
				<div className="product_details">
					<p>hdkjashdasjkhdkasjhda</p>
				</div>
			</div>
		</>
	);
};

export default ProductList;
