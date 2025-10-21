import React, { useState } from "react";
import { generarNumeroAleatorio } from "./funciones/funciones.js";
import './listado.css';

const Listado = () => {
	const [numeros, setNumeros] = useState([]);
	let mensajeNumerosCompletos = null;
	if (numeros.length === 100) {
		mensajeNumerosCompletos = (
			<p>Ya se han generado todos los números del 1-100.</p>
		);
	}
	const eliminarNumero = () => {
		setNumeros([]);
	};
	//¿Es buena idea el uso de recursividad o es mejor evitarlo porque al final carga más la memoria? Estaba pensando que igual es mejor usar un bucle normal aun que eso requiera más lineas.
	const generar = () => {
		if (numeros.length < 100) {
			let numeroNuevo = generarNumeroAleatorio();
			numeros.some((numero) => numero === numeroNuevo)
				? generar()
				: setNumeros([...numeros, numeroNuevo]);
		}
	};

	// Para no darle 100 veces al botón y hacer pruebas más rápido.
	// const cienNumerosDeUna = () => {
	// 	let numerosNuevos = [];
	// 	for (let i = 1; i <= 100; i++) {
	// 		numerosNuevos.push(i);
	// 	}
	// 	setNumeros(numerosNuevos);
	// };
	return (
		<>
			<div className='contador listado'>
				<h1>Lista de números</h1>
				<h2>Ejercicio 1</h2>
				<div className="botones">
					<button 
						onClick={() => {
							generar();
						}}
					>
						Generar
					</button>
					<button
						onClick={() => {
							eliminarNumero();
						}}
					>
						Eliminar
					</button>
					</div>
					{mensajeNumerosCompletos}
					{numeros.length ? (
						<ul>
							{numeros.map((numero) => {
								return <li key={crypto.randomUUID()}>{numero}</li>;
							})}
						</ul>
					) : (
						<p>No hay números en la lista.</p>
					)}
					{/* Lo uso para ver que no genera más de 100 números y sale el mensaje de aviso. 
					<button
						onClick={() => {
							cienNumerosDeUna();
						}}
					>
						cien
					</button> */}
				
				
			</div>
				
		</>
	);
};

export default Listado;
