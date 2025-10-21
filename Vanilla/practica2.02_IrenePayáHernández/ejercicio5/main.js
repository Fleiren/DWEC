"use strict";
//Ejercicio 5 - Media, de números.
import { mediaDeNumeros } from "../biblioteca.js";

let numeroCorrecto1 = 5;
let numeroCorrecto2 = 15;
let numeroCorrecto3 = 10;
let numeroErroneo = "diez";
let numeroErroneo2 = 7.5;
let numeroErroneo3 = -3;
let numeroLimite = 0;

//Pruebo todas las posibilidades.
console.log(`La media de los números ${numeroCorrecto1}, ${numeroCorrecto2} y ${numeroCorrecto3} es: ${mediaDeNumeros(numeroCorrecto1, numeroCorrecto2, numeroCorrecto3)}`);
console.log(`La media de los números ${numeroCorrecto1} y ${numeroLimite} es: ${mediaDeNumeros(numeroCorrecto1, numeroLimite)}`);
console.log(`La media de los números ${numeroErroneo} y ${numeroCorrecto2} es: ${mediaDeNumeros(numeroErroneo, numeroCorrecto2)}`);
console.log(`La media de los números ${numeroErroneo}, ${numeroErroneo2} y ${numeroErroneo3} es: ${mediaDeNumeros(numeroErroneo, numeroErroneo2, numeroErroneo3)}`);
console.log(mediaDeNumeros());

