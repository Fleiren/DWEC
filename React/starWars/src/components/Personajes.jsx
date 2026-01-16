import { useContext } from "react";
import { ContextoPersonajes } from "../context/ProveedorPersonajes.jsx";
import { obtenerIdUrl } from "../libraries/datosApi.js";
import "./personajes.css";
import Personaje from "./Personaje.jsx";
const Personajes = () => {
	const { personajes, seleccionarPersonaje, obtenerPersonajePorId } =
		useContext(ContextoPersonajes);

	//En este caso he aplicado la delegación de eventos para gestionar el evento click en los nombres de los personajes.
	const ElegirPersonaje = (evento) => {
		//No se si es buena práctica usar las clases para identificar los elementos sobre los que aplicar el evento.
		if (evento.target.classList.contains("nombre_personaje")) {
			let personaje = obtenerPersonajePorId(evento.target.id);
			//Cambiamos el personaje seleccionado en el contexto.
			seleccionarPersonaje(personaje);
		}
	};

	return (
		<>
			<div className="contenedor_personajes" onClick={ElegirPersonaje}>
				{personajes.length > 0 &&
					personajes.map((personaje) => {
						//Mostramos todos los personajes obteniendo su id a partir de la url.
						let id_personaje = obtenerIdUrl(personaje.url);
						return (
							<Personaje
								key={id_personaje}
								id={id_personaje}
								personaje={personaje}
							/>
						);
					})}
			</div>
		</>
	);
};

export default Personajes;
