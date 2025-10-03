import React, { useState } from "react";
import { generarNumeroAleatorio } from "./funciones/funciones.js";

const Listado = () => {
	const [numeros, setNumeros] = useState([]);

	const eliminarNumero = () => {
		setNumeros([]);
	};
	//¿Es buena idea el uso de recursividad o es mejor evitarlo porque al final carga más la memoria? Estaba pensando que igual es mejor usar un bucle normal aun que eso requiera más lineas.
	const generar = () => {
		let numeroNuevo = generarNumeroAleatorio();
		numeros.some((numero) => numero === numeroNuevo)
			? generar()
			: setNumeros([...numeros, numeroNuevo]);
	};
	return (
		<>
			<p>
				Lista de Números
				<button onClick={() => {}}>Generar</button>
				<button onClick={() => {}}>Eliminar</button>
			</p>
		</>
	);
};

export default Listado();
