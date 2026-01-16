import { useState, React, createContext, useEffect } from "react";
import { obtenerDatos } from "./../libraries/datosApi.js";

const ContextoPeliculas = createContext();
//Este proveedor se encargará de proporcionar el listado de películas y funciones relacionadas.
const ProveedorPeliculas = ({ children }) => {
	const [peliculas, setPeliculas] = useState([]);
	//Al final la variable error no la he usado, creo que me tienen que faltar validaciones
	const [error, setError] = useState("");
	const url = "https://swapi.py4e.com/api/films/";

	//Declaramos las funciones que necesitaremos para modificar los estados.
	const traerPeliculas = async (url) => {
		try {
			let peliculas = await obtenerDatos(url, "json");
			setPeliculas(peliculas);
		} catch (error) {
			throw error;
		}
	};

	const cambiarError = (mensaje) => {
		setError(mensaje);
	};

	const obtenerPeliculaPorId = (id) => {
		return peliculas.find((pelicula) => {
			return parseInt(pelicula.episode_id) === parseInt(id);
		});
	};

	//Cargamos las películas al montar el componente.
	useEffect(() => {
		traerPeliculas(url);
	}, []);

	const cosasParaExportar = {
		peliculas,
		error,
		cambiarError,
		obtenerPeliculaPorId,
	};
	return (
		<ContextoPeliculas value={cosasParaExportar}>{children}</ContextoPeliculas>
	);
};

export default ProveedorPeliculas;
export { ContextoPeliculas };
