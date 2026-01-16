import React, { useState } from "react";

const useAPI = () => {
	const [cargando, setCargando] = useState(false);
	const [error, setError] = useState(null);

	const llamarApi = async (url, opciones = {}) => {
		setCargando(true);
		setError(null);

		try {
			const respuesta = await fetch(url, {
				headers: {
					"content-type": "application/json",
				},
				...opciones,
			});

			if (!respuesta.ok) {
				throw new Error("Error al realizar la petición a la API.");
			}

			const datos = await respuesta.json();
			return datos;
		} catch (error) {
			setError(error.message);
			throw error;
		} finally {
			setCargando(false);
		}
	};

	//Realizamos la función get
	const obtenerDatos = (url) => {
		return llamarApi(url, { method: "GET" });
	};

	return {
		cargando,
		error,
		obtenerDatos
	}
};

export default useAPI;
