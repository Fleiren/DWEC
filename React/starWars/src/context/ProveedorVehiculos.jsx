import { useState, createContext } from "react";
import { obtenerDatosUrls } from "../libraries/datosApi.js";

const ContextoVehiculos = createContext();
const ProveedorVehiculos = ({ children }) => {
	//Este proveedor se encargará de proporcionar los vehículos de un personaje.
	const [vehiculos, setVehiculos] = useState([]);
	//Utilizo esta variable para controlar si se muestran o no los vehículos en el componente de detalles del personaje.
	const [mostrarVehiculos, setMostrarVehiculos] = useState(false);

	//Declaramos las funciones que necesitaremos para modificar los estados.
	const vaciarVehiculos = () => {
		setVehiculos([]);
	};

	const verVehiculos = () => {
		setMostrarVehiculos(true);
	};

	const ocultarVehiculos = () => {
		setMostrarVehiculos(false);
	};

	const cargarVehiculos = async (urlsVehiculos) => {
		try {
			let datosVehiculos = await obtenerDatosUrls(urlsVehiculos);
			setVehiculos(datosVehiculos);
		} catch (error) {
			throw error;
		}
	};

	const cosasParaExportar = {
		cargarVehiculos,
		vaciarVehiculos,
		vehiculos,
		ocultarVehiculos,
		verVehiculos,
		mostrarVehiculos,
	};

	return (
		<ContextoVehiculos value={cosasParaExportar}>{children}</ContextoVehiculos>
	);
};

export default ProveedorVehiculos;
export { ContextoVehiculos };
