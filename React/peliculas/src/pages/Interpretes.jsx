import React from "react";
import { extraerActores } from "./../components/libraries/gestionActores.js";
import Interprete from "./../components/Interprete.jsx";
import "./interpretes.css";

const Interpretes = (props) => {
	const { peliculas } = props;
	const actores = extraerActores(peliculas);

	return (
		<>
			<h1>Esta es la página de intérpretes</h1>
			<div className="interpretes_interpretes">
				{actores.map((actor, indice) => {
					return <Interprete key={indice} actor={actor}></Interprete>;
				})}
			</div>
		</>
	);
};

export default Interpretes;
