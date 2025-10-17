"use strict";
import { bloquearContenido } from "./biblioteca/ejercicio1.js";
import { tablaNumeros, pintarPrimos } from "./biblioteca/ejercicio2.js";
import { insertarCarrusel } from "./biblioteca/ejercicio4.js";

setTimeout(() => {
	bloquearContenido();
}, 1000);

tablaNumeros();

setTimeout(() => {
	pintarPrimos();
}, 1000);

insertarCarrusel();
