"use strict";
import { bloquearContenido } from "./biblioteca/ejercicio1.js";
import { tablaNumeros, pintarPrimos } from "./biblioteca/ejercicio2.js";
import { carruselFotos } from "./biblioteca/ejercicio4.js";

setTimeout(() => {
	bloquearContenido();
}, 1000);

tablaNumeros();

setTimeout(() => {
	pintarPrimos();
}, 1000);

let contador = 0;
let rutas = [
	"./img/patito1.jpg",
	"./img/patito2.jpg",
	"./img/patito3.jpg",
	"./img/patito4.jpg",
];
setInterval(
	() => {
		console.log(contador);
		carruselFotos(contador, rutas);
		contador === rutas.length - 1 ? (contador = 0) : contador++;
	},
	1000,
	contador,
	rutas
);
