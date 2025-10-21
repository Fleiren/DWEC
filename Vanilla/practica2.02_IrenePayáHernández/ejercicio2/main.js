"use strict";
//Ejercicio 2 - Sólo números.
//Para recordar, indicamos que el número es par o impar, positivo o negativo y si es primo o no.
import { analisisNumerico } from "../biblioteca.js";

let numeroCorrecto = 5;
let numeroCorrecto2 = -2;
let numeroCorrecto3 = 30;
let numeroCorrecto4 = 1.5;
let numeroErroneo = "dos";

//Pruebo todas las posibilidades.
console.log(analisisNumerico(numeroCorrecto));
console.log(analisisNumerico(numeroCorrecto2));
console.log(analisisNumerico(numeroCorrecto3));
console.log(analisisNumerico(numeroCorrecto4));
console.log(analisisNumerico(numeroErroneo));