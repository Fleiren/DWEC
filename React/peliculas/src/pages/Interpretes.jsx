import React from "react";
import { extraerInterpretes } from "./../components/libraries/gestionInterpretes.js";
import Interprete from "./../components/Interprete.jsx";
import "./interpretes.css";

const Interpretes = (props) => {
	const { peliculas } = props;
	const interpretes = extraerInterpretes(peliculas);

	return (
		<>
			<div className="interpretes_contenedor">
				<h1>Esta es la página de intérpretes</h1>
				<div className="interpretes_interpretes">
					{interpretes.map((interprete, indice) => {
						return (
							<Interprete key={indice} interprete={interprete}></Interprete>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Interpretes;
