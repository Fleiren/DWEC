"use strict";

/**
 *
 * @param {number[]} numeros
 * @returns {number[]} con los números mayores que 5
 */
export const mayorQueCinco = (numeros) => {
	return [...numeros].filter((numero) => numero > 5);
};

/**
 *
 * @returns {number[]} con 10 números aleatorios entre 1 y 10
 */
export const generarArrayDiezNumerosAleatorios = () => {
	return [...Array(10)].map(() => Math.floor(Math.random() * 10) + 1);
};

/*APUNTES:

    Con Array.from se puede crear un array con las posiciones que queramos y luego asignar los valores que queramos con una función de callback.
    Array.from({length:10}, () => Math.floor(Math.random() * 10) + 1)

    Con el spread operator y el constructor de Array podemos crear un array vacío con las posiciones que queremos y luego usar map para asignar los valores.
    */
