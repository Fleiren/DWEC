import React from "react";
import useMensajes from "../hooks/useMensajes.js";
import "./mensajeApp.css";

const MensajeApp = () => {
	const { mensaje, tipoMensaje } = useMensajes();

	return (
		<div className={`mensajeApp_contenedor ${tipoMensaje.toLowerCase()}`}>
			{mensaje}
		</div>
	);
};

export default MensajeApp;
