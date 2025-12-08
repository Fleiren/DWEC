import { React } from "react";
import "./actor.css";

const Actor = ({ id_actor, datos }) => {
	//Llamar a la api otra vez, pintar, arreglar todo bonito y manejar cargas.
	return (
		<>
			<div className="contenedor_actor">
				<p className="detalles_actor" id={id_actor}>
					✴{datos.name}
				</p>
			</div>
		</>
	);
};

export default Actor;
