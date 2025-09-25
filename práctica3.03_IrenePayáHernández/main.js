"use strict";
import { constructorCurso } from "./biblioteca/ejercicio1.js";
import { mostrarCurso } from "./biblioteca/ejercicio2.js";
import { imprimirAficiones } from "./biblioteca/ejercicio3.js";

//Ejercicio 1.
console.log("- Ejercicio 1 -");
let curso2Daw = constructorCurso(
	"2DAW",
	2025,
	"Desarrollo de aplicaciones web."
);
//Pruebo que el objeto se ha creado correctamente.
console.log(JSON.stringify(curso2Daw));

//Ejercicio 2.
console.log("- Ejercicio 2 -");
mostrarCurso(curso2Daw);

//Ejercicio 3.
//No hacer las funciones en un archivo aparte
console.log("- Ejercicio 3 -");
let discente = {
	id: 1,
	nombre: "Irene",
	apellidos: "Payá Hernández",
	aficiones: ["Leer", "Tocar el piano", "Cantar"],
	notas: {
		//esto tienen que ser objetos
		primera: [8, 6, 7, 9],
		segunda: [7, 7, 6, 8],
		tercera: [8, 8, 7, 9],
	},
	//las funciones van dentro del objeto.
	calcularMedia: () => {},
};

console.log(imprimirAficiones(discente));
