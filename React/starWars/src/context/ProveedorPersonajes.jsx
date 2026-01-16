import { react, useState, createContext } from "react";
import { obtenerDatosUrls, obtenerIdUrl } from "../libraries/datosApi.js";

const ContextoPersonajes = createContext();
//Este proveedor se encargará de proporcionar los personajes de una película.
const ProveedorPersonajes = ({ children }) => {
	const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
	const [personajes, setPersonajes] = useState([]);

	//Declaramos las funciones que necesitaremos para modificar los estados.
	const cargarPersonajes = async (urlsPersonajes) => {
		try {
			let datosPersonajes = await obtenerDatosUrls(urlsPersonajes);
			setPersonajes(datosPersonajes);
		} catch (error) {
			throw error;
		}
	};

	const vaciarPersonajes = () => {
		setPersonajes([]);
	};

	const seleccionarPersonaje = (personaje) => {
		setPersonajeSeleccionado(personaje);
	};

	const eliminarPersonajeSeleccionado = () => {
		setPersonajeSeleccionado(null);
	};

	//He movido este método aquí ya que entiendo que el proveedor debe manejar toda la información relacionada con los datos que provee.
	const obtenerPersonajePorId = (id) => {
		return personajes.find((personaje) => {
			let id_personaje = obtenerIdUrl(personaje.url);
			return parseInt(id_personaje) === parseInt(id);
		});
	};

	const cosasParaExportar = {
		cargarPersonajes,
		vaciarPersonajes,
		personajes,
		eliminarPersonajeSeleccionado,
		seleccionarPersonaje,
		obtenerPersonajePorId,
		personajeSeleccionado,
	};

	return (
		<ContextoPersonajes value={cosasParaExportar}>
			{children}
		</ContextoPersonajes>
	);
};

export default ProveedorPersonajes;
export { ContextoPersonajes };
