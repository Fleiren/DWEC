import React from "react";
import "./Contenedor.css";

const Contenedor = (props) => {
	return <div className="Contenedor_contenedor">{props.children}</div>;
};

export default Contenedor;
