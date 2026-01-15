import React, { useState, useEffect, createContext } from "react";
import useAPI from "../hooks/useAPI.js";

const ContextoDiscos = createContext();

const ProveedorDiscos = ({ children }) => {
	const [discos, setDiscos] = useState();
	const url = "http://localhost:3000/discos";
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

	return <ContextoDiscos value={acciones}>{children}</ContextoDiscos>;
};

export default ProveedorDiscos;
export { ContextoDiscos };
