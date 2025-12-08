import { React } from "react";
import { Link } from "react-router-dom";
import "./error.css";
const Error = () => {
	return (
		<div className="error-contenedor">
			<h1 className="error-codigo">404</h1>
			<h2 className="error-mensaje">¡Parece que te perdiste!</h2>
			<p className="error-descripcion">
				La página que estás buscando no existe en esta galaxia. Vuelve al camino
				principal.
			</p>
			<Link to="/" className="error-link-inicio">
				Ir a Inicio
			</Link>
		</div>
	);
};

export default Error;
