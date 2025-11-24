import React, { useRef } from "react";
import "./mensajeError.css";
const MensajeError = (props) => {
	const { mensajeError } = props;
	const contenedorErrorRef = useRef();
	return (
		<>
			<div ref={contenedorErrorRef} className="contenedor_mensajeError">
				<p>{mensajeError}</p>
			</div>
		</>
	);
};

export default MensajeError;
