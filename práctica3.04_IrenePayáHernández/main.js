"use strict";

import {minusculaMayuscula, nombresOrdenadosAlReves, convertirStringsAObjetos} from './biblioteca/ejercicio1.js';
import {mayorQueCinco, generarArrayDiezNumerosAleatorios} from './biblioteca/ejercicio2.js';

//Ejercicio 1.
console.log("- Ejercicio 1 -");
let nombres = ["Irene", "Luis", "Aarón", "Carolina", "Francisco"];

//Utilizo el método foreach para mostrar los datos por consola de forma más visual, se puede hacer con map pero para mostrar los datos me parece demasiado.
//Nombres en mayúscula.
console.log("Nombres en mayúscula:");
minusculaMayuscula(nombres).forEach(nombre => console.log(`- ${nombre}`));

//Nombres ordenados alfabéticamente en orden inverso.
console.log("Nombres ordenados alfabéticamente al revés:");
nombresOrdenadosAlReves(nombres).forEach(nombre => console.log(`- ${nombre}`));

//convertir los nombres en objetos con id y nombre.
console.log("Nombres convertidos a objetos:");
convertirStringsAObjetos(nombres).forEach(objeto => console.log(`- id: ${objeto.id}, nombre: ${objeto.nombre}`));

//Ejercicio 2.
console.log("\n- Ejercicio 2 -");
let numeros1 = generarArrayDiezNumerosAleatorios();
let numeros2 = generarArrayDiezNumerosAleatorios();
let numeros3 = generarArrayDiezNumerosAleatorios();

console.log("Números generados mayores que 5:");
//con join se muestra el array como una cadena de texto separada por comas.
console.log(mayorQueCinco([...numeros1, ...numeros2, ...numeros3]).join(", "));



