"use strict";
import { bloquearContenido } from "./biblioteca/ejercicio1.js";
import { tablaNumeros, pintarPrimos } from "./biblioteca/ejercicio2.js";

setTimeout(() => {
	bloquearContenido();
}, 1000);

tablaNumeros();
pintarPrimos();
