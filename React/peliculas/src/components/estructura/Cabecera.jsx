import React from "react";
import "./cabecera.css";

const Cabecera = () => {
	return (
		<>
			<header>
				<img className="logo" src="/src/assets/img/logo.jpg" alt="Logo" />
				<h1 className="titulo">Peliculas de fantasía oscura</h1>
				<p className="frase">
					"No hay nada de malo en ser diferente." ~ Tim Burton
				</p>
			</header>
		</>
	);
};

export default Cabecera;
