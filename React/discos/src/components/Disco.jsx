import React from "react";
import { eliminarDiscoPorId } from "../libraries/ultilFormularios";
const Disco = (props) => {
	//MAL PASAR LÓGICA A LISTAR DISCOS
	const { disco, discos, setDiscos } = props;

	const eliminarDisco = (evento) => {
		setDiscos(eliminarDiscoPorId(evento.target.value, discos));
	};
	return (
		<>
			<div className="contenedor_disco">
				{disco.caratula && (
					<img src={disco.caratula} alt="Carátula del disco" />
				)}
				<h1>{disco.nombre}</h1>
				<h2>{disco.grupo}</h2>
				{disco.anyo && <p>Año de publicación: {disco.anyo}</p>}
				<p>Género: {disco.genero}</p>
				{disco.Localizacion && <p>Localización: {disco.género}</p>}
				<p>{disco.prestado ? "El disco es prestado" : "El disco es nuevo"}</p>
				<input
					type="image"
					id="botonEliminar"
					src="./../img/basura.png"
					alt="eliminar"
					value={disco.id}
					onClick={eliminarDisco}
				/>
			</div>
		</>
	);
};

export default Disco;
