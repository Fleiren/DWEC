import "./filterProductMenu.css";
import useProductContext from "../../../hooks/useProductContext.js";
import createIcon from "../../../assets/img/mas.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const FilterProductMenu = () => {
	const nv = useNavigate();
	const { orderProducts, filterProducts, clearFilter, activeCategory } =
		useProductContext();
	const initialInputs = {
		name: "",
		price: "",
		weight: "",
		order: "",
	};

	const [inputs, setInputs] = useState(initialInputs);

	const reset = () => {
		clearFilter();
		setInputs(initialInputs);
	};

	const navigateCreate = () => {
		nv("/createProduct");
	};

	const applyFilter = (evento) => {
		let type = evento.target.id;
		let value = evento.target.value;
		//De esta forma no dejamos que hayan varios filtros activos a la vez.
		setInputs({ ...initialInputs, [type]: value });
		filterProducts(type, value);
	};

	const applyOrder = (evento) => {
		const value = evento.target.value;
		setInputs({ ...inputs, order: value });
		orderProducts(value);
	};

	useEffect(() => {
		setInputs(initialInputs);
	}, [activeCategory]);
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
							placeholder="1,5"
							value={inputs.weight}
							onInput={applyFilter}
						/>
					</div>
				</form>

				<div className="filter_section_order">
					<div className="filter_group">
						<label htmlFor="orderType">Ordenar lista</label>
						<select id="orderType" onChange={applyOrder} value={inputs.order}>
							<option value="">Sin orden</option>
							<option value="name">Alfabético</option>
							<option value="price">Más barato</option>
							<option value="weight">Más ligero</option>
						</select>
					</div>

					<button className="btn_clear" onClick={reset}>
						Reset
					</button>
					<input
						type="image"
						src={createIcon}
						alt="Añadir producto"
						onClick={navigateCreate}
					/>
				</div>
			</div>
		</>
	);
};

export default FilterProductMenu;
