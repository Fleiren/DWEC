import { React } from "react";
import "./contenido.css";
const Contenido = (props) => {
	return (
		<>
			<div className="contenido_contenido">{props.children}</div>
		</>
	);
};

export default Contenido;
