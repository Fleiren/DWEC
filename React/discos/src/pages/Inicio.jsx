import React from "react";
import { Link } from "react-router-dom";
import "./inicio.css";
const Inicio = () => {
	return (
		<>
			<div className="contenedor_inicio">
				<h1 className="titulo">PROJECT: SONIC ARCHIVE STATUS</h1>

				<blockquote className="cita_principal">
					"We're living in a world of illusion, where reality is only a dream."
				</blockquote>
				<blockquote className="cita_principal">
					"All I see is the eye in the sky. Looking at me."
				</blockquote>
				<blockquote className="cita_principal">
					"Time is the answer, but time is the thief."
				</blockquote>
				<div className="contenedor_enlaces">
					{/*Los nombres de los botones han sido idea de la IA porque no sabía que poner en inicio*/}
					<Link to="/listarDiscos" className="boton_inicio principal">
						TIME KEEPS FLOWING
					</Link>
					<Link to="/insertarDisco" className="boton_inicio secundario">
						NEW PROTOCOL
					</Link>
				</div>
			</div>
		</>
	);
};

export default Inicio;
