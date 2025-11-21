import React from "react";

const Contenido = (props) => {
	return (
		<>
			<div className="contenedor_contenido">{props.children}</div>
		</>
	);
};

export default Contenido;
