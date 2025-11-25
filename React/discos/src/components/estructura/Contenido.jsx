import React from "react";
import "./contenido.css";
const Contenido = (props) => {
	return (
		<>
			<div className="contenedor_contenido">{props.children}</div>
		</>
	);
};

export default Contenido;
