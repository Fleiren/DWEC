import React, { createContext, useState } from "react";

const ContextoMensajes = createContext();

const ProveedorMensajes = ({ children }) => {
	const [mensaje, setMensaje] = useState("");
	// Se me ha ocurrido probar con enum para saber que tipo de mensaje es ya que es un tipo de dato que no manejo bien.
	//He visto que en JS no existen los enum como tal, pero se puede simular.
	const TIPOS_MENSAJES = {
		EXITO: "EXITO",
		ERROR: "ERROR",
		INFO: "INFO",
		WARNING: "WARNING",
	};
	// Se utilizaría de manera opcional para el diseño del mensaje.
	const [tipoMensaje, setTipoMensaje] = useState(TIPOS_MENSAJES.INFO);
	const [mensajeActivo, setMensajeActivo] = useState(false);

	//Como es opcional la función de añadir un tipo de mensaje, por defecto sera INFO.
	const mostrarMensaje = (nuevoMensaje, tipo = "info") => {
		setMensaje(nuevoMensaje);
		switch (tipo.toLowerCase()) {
			case "exito":
				setTipoMensaje(TIPOS_MENSAJES.EXITO);
				break;
			case "error":
				setTipoMensaje(TIPOS_MENSAJES.ERROR);
				break;
			case "warning":
				setTipoMensaje(TIPOS_MENSAJES.WARNING);
				break;
			default:
				setTipoMensaje(TIPOS_MENSAJES.INFO);
		}
		setMensajeActivo(true);
	};

	const ocultarMensaje = () => {
		setMensaje("");
		setTipoMensaje(TIPOS_MENSAJES.INFO);
		setMensajeActivo(false);
	};

	const acciones = {
		mensaje,
		tipoMensaje,
		mensajeActivo,
		mostrarMensaje,
		ocultarMensaje,
	};
	return (
		<ContextoMensajes.Provider value={acciones}>
			{children}
		</ContextoMensajes.Provider>
	);
};

export default ProveedorMensajes;
export { ContextoMensajes };
