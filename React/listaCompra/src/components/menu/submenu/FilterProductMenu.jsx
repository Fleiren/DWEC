import "./filterProductMenu.css";
import useProduct from "../../../hooks/useProduct";
const FilterProductMenu = () => {
	const { orderProducts, filterProducts, clearFilter } = useProduct();
	return (
		<>
			<div className="filter_product_menu">
				<h4>Filtrar productos</h4>
				<button onClick={filterProducts("name")}>nombre</button>
				<button onClick={filterProducts("price")}>precio</button>
				<button onClick={filterProducts("weight")}>peso</button>
				<h4>Ordenar productos</h4>
				<button onClick={orderProducts("name")}>nombre</button>
				<button onClick={orderProducts("price")}>precio</button>
				<button onClick={orderProducts("weight")}>peso</button>
				<button onClick={clearFilter}>Limpiar filtros</button>
			</div>
		</>
	);
};

export default FilterProductMenu;
