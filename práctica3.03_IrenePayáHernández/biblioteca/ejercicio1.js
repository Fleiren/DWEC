"use strict";


//Esto devuelve un array nuevo con los nombres en mayúscula, no es necesario el uso del spread operator porque map ya devuelve un array nuevo.
/**
 * 
 * @param {string[]} nombres 
 * @returns {string[]} con los nombres en mayúscula
 */
export const minusculaMayuscula = (nombres)=>{
	return nombres.map(nombre => nombre.toUpperCase());
}

/*También se puede hacer con forEach para mostrar sin modificar el array original.
export const mostrarMayuscula = (nombres)=>{
	nombres.forEach(nombre => console.log(nombre.toUpperCase()));
}*/

/**
 * 
 * @param {string[]} nombres 
 * @returns {string[]} con los nombres ordenados alfabéticamente en orden inverso.
 */
export const nombresOrdenadosAlReves = (nombres)=>{
	return [...nombres].sort().reverse();
}

export const convertirStringsAObjetos = (nombres)=>{
	//Al utilizar una función de callback tenemos como paramtros de entrada el valor y el índice (también está el array original, pero no nos hace falta).
	return nombres.map((nombre, indice) => {
		return {
			id : indice,
			nombre : nombre
		}
	})
}


