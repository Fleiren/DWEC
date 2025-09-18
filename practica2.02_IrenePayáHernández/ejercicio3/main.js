"use strict";
//Ejercicio 3 - Números otra vez.
import { multiplosDeTres } from "../biblioteca.js";

let numeroCorrecto = 15;
let numeroErroneo = -3;
let numeroErroneo2 = "tres";
let numeroErroneo3 = 4.5;

//Compruebo todas las posibilidades.
console.log(`Los múltiplos de tres hasta el número ${numeroCorrecto} son: ${multiplosDeTres(numeroCorrecto)}`);
console.log(`Los múltiplos de tres hasta el número ${numeroErroneo} son: ${multiplosDeTres(numeroErroneo)}`);
console.log(`Los múltiplos de tres hasta el número ${numeroErroneo2} son: ${multiplosDeTres(numeroErroneo2)}`);
console.log(`Los múltiplos de tres hasta el número ${numeroErroneo3} son: ${multiplosDeTres(numeroErroneo3)}`);