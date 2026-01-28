import useProduct from "./../hooks/useProduct.js";
import Product from "./../components/Product.jsx";
import FilterProductMenu from "../components/menu/submenu/FilterProductMenu.jsx";
import useAuth from "../hooks/useAuth.js";
import Loading from "./../components/Loading.jsx";
import "./productList.css";
const ProductList = () => {
	const { filteredProducts, loading } = useProduct();
	const { isAuthenticated } = useAuth();

	const calculateAverage = () => {
		let totalPrice = 0;
		filteredProducts.forEach((product) => {
			totalPrice += product.price;
		});

		return totalPrice / filteredProducts.length || 0;
	};
	const totalProducts = filteredProducts.length;
	const averagePrice = calculateAverage();
	return (
		<>
			<div className="product_list_container">
				<h1>Lista de Libros</h1>
				{loading ? (
					<Loading />
				) : (
					<>
						{isAuthenticated && <FilterProductMenu />}
						<div className="product_list">
							{filteredProducts.length > 0 ? (
								filteredProducts.map((product) => {
									return <Product key={product.id} product={product} />;
								})
							) : (
								<h4>No hay productos que coincidan con la búsqueda.</h4>
							)}
						</div>
						<div className="product_details">
							<strong>
								Cantidad
								<span className="stat_value">{totalProducts}</span>
							</strong>
							<strong>
								Media de Precio
								<span className="stat_value">{averagePrice.toFixed(2)}€</span>
							</strong>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default ProductList;
