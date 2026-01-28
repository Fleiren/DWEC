import useProduct from "./../hooks/useProduct.js";
import Product from "./../components/Product.jsx";
import FilterProductMenu from "../components/menu/submenu/FilterProductMenu.jsx";
import useAuth from "../hooks/useAuth.js";
import Loading from "./../components/Loading.jsx";
const ProductList = () => {
	const { products, filteredProducts, isFiltered, loading } = useProduct();
	const { isAuthenticated } = useAuth();
	//Esta idea la he pillado de la IA porque me estaba dando un error y al pasarle el código para que me ayude me ha recomendado esto y me ha parecido profesional (es una tontería pero no se me había ocurrido).
	//De esta manera quito lógica en el HTML.
	const actualList = isFiltered ? filteredProducts : products;
	return (
		<>
			<div className="product_list_container">
				<h1>Lista de Libros</h1>
				{loading ? (
					<Loading />
				) : (
					<>
						{isAuthenticated && <FilterProductMenu />}
						<div className="product_lista">
							{actualList.length > 0 ? (
								actualList.map((product) => {
									return <Product key={product.id} product={product} />;
								})
							) : (
								<h4>No hay productos que coincidan con la búsqueda.</h4>
							)}
						</div>
						<div className="product_details">
							<p>hdkjashdasjkhdkasjhda</p>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default ProductList;
