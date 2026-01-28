import "./filterProductMenu.css";
import useProduct from "../../../hooks/useProduct";
import { useState } from "react";
const FilterProductMenu = () => {
	const { orderProducts, filterProducts, clearFilter } = useProduct();
	const initialInputs = {
		name: "",
		price: "",
		weight: "",
	};

	const [inputs, setInputs] = useState(initialInputs);

	const reset = () => {
		clearFilter();
		setInputs(initialInputs);
	};

	const applyFilter = (evento) => {
		let type = evento.target.id;
		let value = evento.target.value;
		//De esta forma no dejamos que hayan varios filtros activos a la vez.
		setInputs({ ...initialInputs, [type]: value });
		filterProducts(type, value);
	};
	return (
		<>
			<div className="filter_product_menu">
				<form className="filter_section_inputs">
					<div className="filter_group">
						<label htmlFor="name">Nombre</label>
						<input
							id="name"
							type="text"
							placeholder="Amanecer rojo"
							value={inputs.name}
							onInput={applyFilter}
						/>
					</div>
					<div className="filter_group">
						<label htmlFor="price">Precio</label>
						<input
							id="price"
							type="number"
							placeholder="20"
							value={inputs.price}
							onInput={applyFilter}
						/>
					</div>
					<div className="filter_group">
						<label htmlFor="weight">Peso</label>
						<input
							id="weight"
							type="number"
							placeholder="1.5"
							value={inputs.weight}
							onInput={applyFilter}
						/>
					</div>
				</form>

				<div className="filter_section_order">
					<div className="filter_group">
						<label htmlFor="orderType">Ordenar lista</label>
						<select
							id="orderType"
							onChange={(evento) => orderProducts(evento.target.value)}
						>
							<option value="">Sin orden</option>
							<option value="name">Alfabético</option>
							<option value="price">Más barato</option>
							<option value="weight">Más ligero</option>
						</select>
					</div>

					<button className="btn_clear" onClick={reset}>
						Reset
					</button>
				</div>
			</div>
		</>
	);
};

export default FilterProductMenu;
