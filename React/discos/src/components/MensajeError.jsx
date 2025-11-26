import React, { useRef } from "react";
import "./mensajeError.css";
const MensajeError = (props) => {
	const { mensajeError } = props;
	return (
		<>
			<div className="contenedor_mensajeError">
				<p>{mensajeError}</p>
			</div>
		</>
	);
};

export default MensajeError;
