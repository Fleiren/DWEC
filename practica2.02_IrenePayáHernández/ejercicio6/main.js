"use strict";
//Ejercicio 6 - Calculadora.
import { calculadora } from "../biblioteca.js";

let numeroCorrecto1 = 2;
let numeroCorrecto2 = 3;
let operadorCorrecto = "+";
let operadorCorrecto2 = "-";
let operadorCorrecto3 = "*";
let operadorCorrecto4 = "/";
let operadorCorrecto5 = "%";
let operadorErroneo = "x";
let numeroErroneo1 = "dos";
let numeroErroneo2 = 1.5;
let numeroLimite = 0;

//Pruebo todas las posibilidades.
console.log(`${numeroCorrecto1} ${operadorCorrecto} ${numeroCorrecto2} = ${calculadora(numeroCorrecto1, numeroCorrecto2, operadorCorrecto)}`);
console.log(`${numeroCorrecto1} ${operadorCorrecto2} ${numeroCorrecto2} = ${calculadora(numeroCorrecto1, numeroCorrecto2, operadorCorrecto2)}`);
console.log(`${numeroCorrecto1} ${operadorCorrecto3} ${numeroCorrecto2} = ${calculadora(numeroCorrecto1, numeroCorrecto2, operadorCorrecto3)}`);
console.log(`${numeroCorrecto1} ${operadorCorrecto4} ${numeroCorrecto2} = ${calculadora(numeroCorrecto1, numeroCorrecto2, operadorCorrecto4)}`);
console.log(`${numeroCorrecto1} ${operadorCorrecto5} ${numeroCorrecto2} = ${calculadora(numeroCorrecto1, numeroCorrecto2, operadorCorrecto5)}`);
console.log(`${numeroCorrecto1} ${operadorErroneo} ${numeroCorrecto2} = ${calculadora(numeroCorrecto1, numeroCorrecto2, operadorErroneo)}`);
console.log(`${numeroErroneo1} ${operadorCorrecto} ${numeroCorrecto2} = ${calculadora(numeroErroneo1, numeroCorrecto2, operadorCorrecto)}`);
console.log(`${numeroErroneo2} ${operadorCorrecto} ${numeroCorrecto2} = ${calculadora(numeroErroneo2, numeroCorrecto2, operadorCorrecto)}`);
console.log(`${numeroCorrecto1} ${operadorCorrecto4} ${numeroLimite} = ${calculadora(numeroCorrecto1, numeroLimite, operadorCorrecto4)}`);  
console.log(`${numeroCorrecto1} ${operadorCorrecto5} ${numeroLimite} = ${calculadora(numeroCorrecto1, numeroLimite, operadorCorrecto5)}`);
