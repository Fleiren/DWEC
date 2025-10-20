"use strict";
import { bloquearContenido } from "./biblioteca/ejercicio1.js";
import { tablaNumeros, pintarPrimos } from "./biblioteca/ejercicio2.js";
import { carruselFotos, insertarImagen } from "./biblioteca/ejercicio4.js";

setTimeout(() => {
	bloquearContenido();
}, 1000);

tablaNumeros();

setTimeout(() => {
	pintarPrimos();
}, 1000);

//Empoezo con el contador a 1 porque al generar la imagen ya se utiliza la primera.
let contador = 1;
let rutas = [
	"./img/patito1.jpg",
	"./img/patito2.jpg",
	"./img/patito3.jpg",
	"./img/patito4.jpg",
];
insertarImagen(rutas[0]);

//Cada segundo se cambiará la imagen, le pasamos contador y rutas a la función setInterval y las utilizamos para llamar al carrusel.
setInterval(
	() => {
		carruselFotos(contador, rutas);
		//Para que se reinicie el carrusel reiniciamos la variable contador cuando se haya llegado a la última imagen del carrusel.
		contador === rutas.length - 1 ? (contador = 0) : contador++;
	},
	2000,
	contador,
	rutas
);
