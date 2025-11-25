import React from "react";
import "./cabecera.css";

const Cabecera = () => {
	return (
		<>
			<header className="cabecera_contenedor">
				<img src="./src/img/eyeInTheSky.jpg" id="logo" alt="Logo" />
				<h1>Discos</h1>
				<em>
					"Remember that you were a friend of mine, as the final curtain falls
					before my eyes." ~ The Alan Parsons Project - Old And Wise
				</em>
			</header>
		</>
	);
};

export default Cabecera;
