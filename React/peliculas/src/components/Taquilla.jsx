import React from "react";
import "./taquilla.css";

const Taquilla = (props) => {
	const { taquilla } = props;
	const formatear = () => {
		return new Intl.NumberFormat("es-ES", {
			style: "currency",
			currency: "EUR",
		}).format(taquilla);
	};
	return (
		<>
			<div className="taquilla_contenedor">
				<h1>Precio: {formatear()}</h1>
			</div>
		</>
	);
};

export default Taquilla;
