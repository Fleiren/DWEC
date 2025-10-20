"use strict";

const esPrimo = (numero) => {
	if (numero < 2 || !Number.isInteger(numero)) {
		return false;
	}
	for (let i = 2; i <= Math.sqrt(numero); i++) {
		if (numero % i === 0) {
			return false;
		}
	}
	return true;
}

const numAleatorio = (rango, base) => {
	return Math.floor(Math.random()*rango) + base;
}

export {esPrimo, numAleatorio};