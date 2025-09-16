"use strict";
import {imc} from './../biblioteca.js';


let masaMarcos = 70;
let masaJuan = 90;
//Altura en metros (He buscado en google para hacer bien la fórmula)
let alturaMarcos = 1.8;
let alturaJuan = 1.7;

let imcMarcos = imc(masaMarcos, alturaMarcos);
let imcJuan = imc(masaJuan, alturaJuan);
let marcosMasImcJuan = imcMarcos > imcJuan; 

console.log(`¿Tiene Marcos un IMC que el de Juan?: ${marcosMasImcJuan}`);

//Console.log para comprobación de datos
console.log(`Marcos pesa ${masaMarcos}kg`);
console.log(`Marcos mide ${alturaMarcos}m`);
console.log(`Juan pesa ${masaJuan}kg`);
console.log(`Juan mide ${alturaJuan}m`);
console.log(`Marcos tiene un IMC = ${imcMarcos} y Juan tiene un IMC = ${imcJuan}`);




