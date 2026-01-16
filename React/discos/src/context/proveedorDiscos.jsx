import React, { useState, useEffect, createContext } from "react";
import useAPI from "../hooks/useAPI.js";

const ContextoDiscos = createContext();

const ProveedorDiscos = ({ children }) => {
	const [discos, setDiscos] = useState();
	const url = "http://localhost:3000/discos";
	const { cargando, error, obtenerDatos } = useAPI();
	const obtenerDiscos = async () => {
		try {
			const datos = await obtenerDatos(url);
			setDiscos(datos);
		} catch (error) {
			throw error;
		}
	};
	useEffect(() => {
		obtenerDiscos();
	}, []);

	const acciones = {
		discos,
		cargando,
		error,
		obtenerDiscos,
	};

	return (
		<ContextoDiscos.Provider value={acciones}>
			{children}
		</ContextoDiscos.Provider>
	);
};

export default ProveedorDiscos;
export { ContextoDiscos };
