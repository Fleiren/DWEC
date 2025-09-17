"use strict";

//Ejercicio 1 - Números y meses.

/**
 * 
 * @param {number} numero Número del mes (1-12).
 * @returns {string} El mes correspondiente al número introducido o el mensaje de error.
 */
export const mesSegunNumero = (numero) => {
    //He decidido hacer un array con los meses para que el código sea más limpio.
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    //He visto que existe un método para comprobar si un número es entero, por lo que a parte de comprobar si es NaN, compruebo si es entero.
    if (isNaN(numero) || !Number.isInteger(numero)){
        return "Introduce un número entero entre 1 y 12";
    } else if(numero < 1 || numero > 12){
        return "Veo que no sabes contar. Introduce un número entre 1 y 12";
    }
    //Resto 1 al número para que coincida con el índice del array.
    return meses[numero - 1];
}

//Ejercicio 2 - Sólo números.

/**
 * Esta funcion indica si el número introducido es par o impar, positivo o negativo y si es primo o no.
 * @param {number} numero 
 * @returns {string}
 */
export const analisisNumerico = (numero) => {
    //Con esta variable podré ir concatenando la respuesta hasta tenerla completa.
    let respuesta;
    
    if(isNaN(numero)){
        return "Introduce un número.";
    }
    
    //Utilizo el operador ternario porque me parece más limpio.
    esPar(numero) ? respuesta = `El número ${numero} es par` : respuesta = `El número ${numero} es impar`;
    esPositivo(numero) ? respuesta += ", positivo" : respuesta += ", negativo";
    esPrimo(numero) ? respuesta += " y primo." : respuesta += " y no es primo.";
    return respuesta;
}

//Estas funciones no las exporto porque no voy a usarlas por separado, solo dentro de la función analisisNumerico.
/**
 * 
 * @param {number} numero 
 * @returns {boolean}
 */
const esPar = (numero) => {
    //Un número es par si el resto de dividirlo entre 2 es 0.
    return numero % 2 === 0;
}

/**
 * 
 * @param {number} numero 
 * @returns {boolean}
 */
const esPositivo = (numero) => {
    //Un número es positivo si es mayor o igual que 0, (un poco obvio pero no se que comentario poner, asiq por si acaso hay un futuro programador algo paletillo lo explico).
    return numero >= 0;
}

/**
 * 
 * @param {number} numero 
 * @returns {boolean}
 */
const esPrimo = (numero) => {
    //Un número es primo si es mayor a 1, es entero y no tiene divisores a parte del 1 y él mismo.
    if(numero < 2 || !Number.isInteger(numero)){
        return false;
    }
    //He usado Math.sqrt que ya conocía de java para calcular la raíz cuadrada del número.
    for(let i = 2; i <= Math.sqrt(numero); i++){
        if(numero % i === 0){
            return false;
        }
    }
    return true;
}

//Ejercicio 3 - Números otra vez.
