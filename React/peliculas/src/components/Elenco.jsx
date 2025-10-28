import React from "react";
import "./elenco.css";
import Interprete from "./Interprete";
import {
	extraerInterpretes,
	extraerInterpreteDetallado,
} from "./libraries/gestionInterpretes.js";

const Elenco = (props) => {
	const { interpretes, peliculas } = props;
	const listaInterpretesCompleta = extraerInterpretes(peliculas);
	return (
		<>
			<div className="elenco_elenco">
				{interpretes.map((interprete, indice) => {
					const interpreteDetallado = extraerInterpreteDetallado(
						listaInterpretesCompleta,
						interprete.nombre
					);
					return (
						<Interprete
							key={indice}
							interprete={interpreteDetallado}
						></Interprete>
					);
				})}
			</div>
		</>
	);
};

export default Elenco;
