import React from "react";
import "./error.css";

const Error = () => {
	return (
		<>
			<div className="error_contenedor">
				<h1 className="error_codigo">404</h1>
				<p className="error_mensaje">
					Parece que esta página se ha desvanecido en la niebla.
				</p>
				<p className="error_instruccion">Intenta volver a un lugar seguro.</p>
			</div>
		</>
	);
};

export default Error;
