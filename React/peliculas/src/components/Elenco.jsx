import React from "react";
//No me ha hecho falta contenido css.
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
					{
						/**Aprovecho que tengo una función que extrae actores con las peliculas en las que aparece para que sea todo más detallado. */
					}
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
