import React, { useState, useEffect, createContext } from "react";
import useAPI from "../hooks/useAPI.js";
import { useNavigate } from "react-router-dom";
import useMensajes from "../hooks/useMensajes.js";

const ContextoDiscos = createContext();

const ProveedorDiscos = ({ children }) => {
	const [discos, setDiscos] = useState([]);
	const url = "http://localhost:3000/discos";
	const { cargando, error, obtenerDatos, borrar, guardar, editar } = useAPI();
	//No se si es buena práctica que un contexto use a otro pero para los errores lo veo útil igual que el navigate aquí en el contexto pero no se como hacer que se redirija a una página de error global con los errores de la api de otra manera.
	const { mostrarMensaje } = useMensajes();
	const navigate = useNavigate();
	const obtenerDiscos = async () => {
		try {
			const datos = await obtenerDatos(url);
			setDiscos(datos);
		} catch (error) {
			mostrarMensaje(error.message, "error");
			navigate("/error");
			//En realidad con esto ya no haría falta lanzar el error, me da a mi que no es buena idea no se porque jajajaja.
		}
	};

	const borrarDisco = async (id) => {
		try {
			const datos = await borrar(`${url}/${id}`);
			if (datos) {
				eliminarDiscoPorId(id);
			}
			mostrarMensaje("Disco eliminado con éxito.", "exito");
		} catch (error) {
			mostrarMensaje("Error al eliminar el disco.", "error");
			throw error;
		}
	};

	/**
	 * Eliminar de la lista el disco con la id que se pasa por parámetro.
	 * @param {string} id
	 * @param {Array} discos
	 * @returns {Array}
	 */
	const eliminarDiscoPorId = (id) => {
		const discosActualizados = discos.filter((disco) => disco.id !== id);
		setDiscos(discosActualizados);
	};

	const guardarDisco = async (disco) => {
		try {
			const datos = await guardar(url, disco);
			if (datos) {
				setDiscos([...discos, datos]);
			}
			mostrarMensaje("Disco guardado con éxito.", "exito");
		} catch (error) {
			mostrarMensaje("Error al guardar el disco.", "error");
			throw error;
		}
	};

	const editarDisco = async (disco) => {
		try {
			const datos = await editar(`${url}/${disco.id}`, disco);
			if (datos) {
				obtenerDiscos();
			}
			mostrarMensaje("Disco editado con éxito.", "exito");
		} catch (error) {
			mostrarMensaje("Error al editar el disco.", "error");
			throw error;
		}
	};

	/**
	 * Devuelve la lista de discos filtrada buscando coincidencias con el string que se ha pasado por parámetro.
	 * @param {string} dato
	 * @param {Array} discos
	 * @returns {Array}
	 */
	const buscarDisco = (dato) => {
		let resultado = [];
		resultado = [...discos].filter(
			(disco) =>
				disco.nombre.toLowerCase().includes(dato.toLowerCase()) ||
				disco.genero.toLowerCase().includes(dato.toLowerCase()) ||
				disco.grupo.toLowerCase().includes(dato.toLowerCase()) ||
				disco.localizacion.toLowerCase().includes(dato.toLowerCase()) ||
				disco.anyo.toString().includes(dato),
		);
		return resultado;
	};

	/**
	 * Busca el disco con la id pasada por parámetro.
	 * @param {string} id
	 * @param {Array} discos
	 * @returns {Object}
	 */
	const buscarDiscoId = (id) => {
		return discos.find((disco) => {
			return disco.id === id;
		});
	};

	useEffect(() => {
		obtenerDiscos();
	}, []);

	const acciones = {
		discos,
		cargando,
		error,
		obtenerDiscos,
		borrarDisco,
		guardarDisco,
		editarDisco,
		buscarDisco,
		buscarDiscoId,
	};

	return (
		<ContextoDiscos.Provider value={acciones}>
			{children}
		</ContextoDiscos.Provider>
	);
};

export default ProveedorDiscos;
export { ContextoDiscos };
