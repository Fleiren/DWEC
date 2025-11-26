import React from "react";
import "./discoDetalles.css";
import { useParams } from "react-router-dom";
import { buscarDiscoId } from "./../libraries/ultilFormularios.js";
const DiscoDetalles = (props) => {
	const { discos } = props;
	const { id } = useParams();
	//Obtenemos el disco con esa id.
	const disco = buscarDiscoId(id, discos);
	//Me cuesta manejar un poco las condiciones para mostrar o no datos ya que combinar el js y el html en el return se me hace complicado, quiero hacer ternarias pero no me va bien ya que mi idea es que si le objeto disco es null que se muestre algún error.
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
				</div>
			</div>
		</>
	);
};

export default DiscoDetalles;
