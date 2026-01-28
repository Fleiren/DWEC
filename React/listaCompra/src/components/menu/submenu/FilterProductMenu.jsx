import "./filterProductMenu.css";
import useProduct from "../../../hooks/useProduct";
const FilterProductMenu = () => {
	const { orderProducts, filterProducts, clearFilter } = useProduct();
	return (
		<>
			<div className="filter_product_menu">
				<div className="filter_section_inputs">
					{/* Búsqueda por Nombre */}
					<div className="filter_group">
						<label htmlFor="name">Nombre</label>
						<input
							id="name"
							type="text"
							placeholder="Amanecer rojo"
							onInput={(evento) => filterProducts("name", evento.target.value)}
						/>
					</div>

					{/* Búsqueda por Precio */}
					<div className="filter_group">
						<label htmlFor="price">Precio Máx.</label>
						<input
							id="price"
							type="number"
							placeholder="20"
							onInput={(evento) => filterProducts("price", evento.target.value)}
						/>
					</div>

					{/* Búsqueda por Peso */}
					<div className="filter_group">
						<label htmlFor="weight">Peso Máx.</label>
						<input
							id="weight"
							type="number"
							placeholder="500"
							onInput={(evento) =>
								filterProducts("weight", evento.target.value)
							}
						/>
					</div>
				</div>

				<div className="filter_section_order">
					{/* Ordenación */}
					<div className="filter_group">
						<label htmlFor="orderType">Ordenar lista</label>
						<select
							id="orderType"
							onChange={(e) => orderProducts(e.target.value)}
						>
							<option value="">Sin orden</option>
							<option value="name">Alfabético</option>
							<option value="price">Más barato</option>
							<option value="weight">Más ligero</option>
						</select>
					</div>

					<button className="btn_clear" onClick={clearFilter}>
						Reset
					</button>
				</div>
			</div>
		</>
	);
};

export default FilterProductMenu;
