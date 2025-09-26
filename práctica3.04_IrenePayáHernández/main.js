"use strict";

import {
	minusculaMayuscula,
	nombresOrdenadosAlReves,
	convertirStringsAObjetos,
} from "./biblioteca/ejercicio1.js";
import {
	mayorQueCinco,
	generarArrayDiezNumerosAleatorios,
} from "./biblioteca/ejercicio2.js";

//Ejercicio 1.
console.log("- Ejercicio 1 -");
let nombres = ["Irene", "Luis", "Aarón", "Carolina", "Francisco"];

//Utilizo map para que el array se muestre por pantalla más bonito.
//Nombres en mayúscula.
console.log("Nombres en mayúscula:");
console.log(minusculaMayuscula(nombres).map((nombre) => `- ${nombre}`).join("\n"));

//Nombres ordenados alfabéticamente en orden inverso.
console.log("Nombres ordenados alfabéticamente al revés:");
console.log(nombresOrdenadosAlReves(nombres).map((nombre) => `- ${nombre}`).join("\n"));

//convertir los nombres en objetos con id y nombre.
console.log("Nombres convertidos a objetos:");
console.log(
	convertirStringsAObjetos(nombres).map(
		(objeto) => `- id: ${objeto.id}, nombre: ${objeto.nombre}`
	).join("\n")
);

//Ejercicio 2.
console.log("\n- Ejercicio 2 -");
let numeros1 = generarArrayDiezNumerosAleatorios();
let numeros2 = generarArrayDiezNumerosAleatorios();
let numeros3 = generarArrayDiezNumerosAleatorios();

console.log("Números generados mayores que 5:");
//con join se muestra el array como una cadena de texto separada por comas.
console.log(mayorQueCinco([...numeros1, ...numeros2, ...numeros3]).join(", "));
