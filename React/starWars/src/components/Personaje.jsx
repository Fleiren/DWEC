import { React } from "react";
import "./personaje.css";

const Personaje = ({ id, personaje }) => {
	return (
		<>
			{personaje && (
				<div className="contenedor_personaje">
					<p className="nombre_personaje" id={id}>
						✴{personaje.name}
					</p>
				</div>
			)}
		</>
	);
};

export default Personaje;
