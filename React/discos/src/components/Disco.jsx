import React from "react";
import { useNavigate } from "react-router-dom";
import "./disco.css";

const Disco = (props) => {
	const { disco } = props;
	const navigate = useNavigate();
	const navegar = (evento) => {
		//Si le damos a otro sitio que no sea eliminar entonces veremos los detalles del disco.
		if (evento.target.name !== "eliminar") {
			navigate(`/disco/${disco.id}`);
		}
	};
	return (
		<>
			<div className="contenedor_disco" onClick={navegar}>
				{disco.caratula && (
					<img src={disco.caratula} alt="Carátula del disco" />
				)}
				<h1>{disco.nombre}</h1>
				<h2>{disco.grupo}</h2>
				<p>Género: {disco.genero}</p>
				<input
					type="image"
					id="botonEliminar"
					name="eliminar"
					src="/src/img/basura2.jpg"
					alt="Eliminar"
					value={disco.id}
				/>
			</div>
		</>
	);
};

export default Disco;
