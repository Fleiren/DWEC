"use strict";
//Ejercicio 4 - Potencia, de números.
import { potencia } from "../biblioteca.js";

let baseCorrecta = 2;
let exponenteCorrecto = 3;
let exponenteCorrecto2 = -2;
let baseErronea = "dos";
let baseErronea2 = 1.5;
let exponenteErroneo = "cinco";
let exponenteErroneo2 = 2.5;

//Pruebo todas las posibilidades.
console.log(`${baseCorrecta} ^ ${exponenteCorrecto} = ${potencia(baseCorrecta, exponenteCorrecto)}`);
console.log(`${baseCorrecta} ^ ${exponenteCorrecto2} = ${potencia(baseCorrecta, exponenteCorrecto2)}`);
console.log(`${baseErronea} ^ ${exponenteCorrecto} = ${potencia(baseErronea, exponenteCorrecto)}`);
console.log(`${baseErronea2} ^ ${exponenteErroneo} = ${potencia(baseErronea2, exponenteErroneo)}`);
console.log(`${baseErronea2} ^ ${exponenteErroneo2} = ${potencia(baseErronea2, exponenteErroneo2)}`);
console.log(`${baseCorrecta} ^ ${exponenteErroneo} = ${potencia(baseCorrecta, exponenteErroneo)}`);
console.log(`${baseErronea} ^ ${exponenteErroneo2} = ${potencia(baseErronea, exponenteErroneo2)}`);