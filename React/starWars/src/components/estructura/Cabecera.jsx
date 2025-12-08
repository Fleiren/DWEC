import { React } from "react";
import "./cabecera.css";
const Cabecera = () => {
	return (
		<>
			<header className="cabecera_contenedor">
				<img
					id="logo"
					src="https://brandemia.org/sites/default/files/inline/images/02-starwars-imagenes-brandemia-blog.jpg"
					alt="logo"
				/>
				<h1>Star Wars</h1>
			</header>
		</>
	);
};

export default Cabecera;
