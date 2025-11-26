import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

const Error = () => {
	return (
		<>
			<div className="contenedor_error">
				<h1 className="codigo_error">PROTOCOLO FALLIDO. CÓDIGO 404.</h1>

				<blockquote className="cita_principal">
					"I don't know who I am, I don't know where I've been."
				</blockquote>
				{/**Esta frase también idea de la IA. */}
				<p className="descripcion">
					El archivo de destino no responde. El sistema ha activado el **Módulo
					de Regreso a Base** para evitar la corrupción de datos. Se requiere
					reorientación manual.
				</p>

				<Link to="/" className="boton_reorientar">
					EJECUTAR MÓDULO DE REGRESO
				</Link>
			</div>
		</>
	);
};

export default Error;
