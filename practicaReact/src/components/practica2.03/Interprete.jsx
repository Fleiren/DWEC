import React from "react";
import "./Interprete.css";

const Interprete = (props) => {
	return (
		<>
			<div className="Interprete_contenedor">
				<img className="Interprete_foto" src={props.foto} alt={props.nombre} ></img>
				<div className="Interprete_nombre">{props.nombre}</div>
				<div className="Interprete_descripcion">{props.children}</div>
			</div>
		</>
	);
};

export default Interprete;

