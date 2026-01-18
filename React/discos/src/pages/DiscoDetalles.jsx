import React from "react";
import "./discoDetalles.css";
import useDiscos from "../hooks/useDiscos.js";
import { useParams, useNavigate } from "react-router-dom";

const DiscoDetalles = () => {
	const { buscarDiscoId } = useDiscos();
	const { id } = useParams();
	const navigate = useNavigate();
	const disco = buscarDiscoId(id);

	//Navegamos a la página de edición del disco.
	const navegarEdicion = () => {
		navigate(`/editarDisco/${id}`);
	};
	return (
		<>
			<div className="contenedor_detalles">
				<div className="informacion_principal">
					{disco.caratula && <img src={disco.caratula} alt="Carátula"></img>}
					<h1>{disco.nombre}</h1>
					<h2>{disco.grupo}</h2>
					<p>Género: {disco.genero}</p>
				</div>
				<div className="informacion_secundaria">
					{disco.anyo && <p>Año de publicación: {disco.anyo}</p>}
					{disco.Localizacion && <p>Localización: {disco.género}</p>}
					<p>{disco.prestado ? "El disco es prestado" : "El disco es nuevo"}</p>
					<button id="editar" onClick={navegarEdicion}>
						Editar
					</button>
				</div>
			</div>
		</>
	);
};

export default DiscoDetalles;
