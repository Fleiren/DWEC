import React from "react";
import "./contenido.css";

const Contenido = (props) => {
	return (
		<>
			<div className="contenido_Contenido">{props.children}</div>
		</>
	);
};

export default Contenido;
