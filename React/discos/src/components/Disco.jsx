import React from "react";
import "./disco.css";

const Disco = (props) => {
	//Para los eventos me he liado un poco, por ejemplo para eliminar no me funcionaba pensando en que al colocar un onClick al componente Disco ya funcionaba como en Vanilla,
	//pero no, no puedo colocar eventos como tal a los componentes, tengo que indicar en el input que al hacer onClick ejecute la función que he pasado por props al componente, no se si es la mejor solución,
	//pero no quería que la lógica se hiciera en este componente y al final probando cosas la IA me ha dicho que pusiera el onClick también en el input.
	const { disco, eliminarDisco } = props;
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
					name="eliminar"
					src="/src/img/basura2.jpg"
					alt="Eliminar"
					value={disco.id}
					onClick={eliminarDisco}
				/>
			</div>
		</>
	);
};

export default Disco;
