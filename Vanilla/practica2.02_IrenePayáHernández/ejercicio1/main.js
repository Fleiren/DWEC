"use strict";
//Ejercicio 1 - Números y meses.
import { mesSegunNumero} from "../biblioteca.js";

let numeroCorrecto = 3;
let numeroErroneo = 15;
let numeroErroneo2 = "Enero";
let numeroLimite = 0;
let numeroLimite2 = 13;
//Pruebo que devuelva el mes correcto y los mensajes de error.
console.log(`El mes correspondiente al número ${numeroCorrecto} es: ${mesSegunNumero(numeroCorrecto)}`); 
console.log(`El mes correspondiente al número ${numeroErroneo} es: ${mesSegunNumero(numeroErroneo)}`); 
console.log(`El mes correspondiente al número ${numeroErroneo2} es: ${mesSegunNumero(numeroErroneo2)}`); 
console.log(`El mes correspondiente al número ${numeroLimite} es: ${mesSegunNumero(numeroLimite)}`);
console.log(`El mes correspondiente al número ${numeroLimite2} es: ${mesSegunNumero(numeroLimite2)}`);