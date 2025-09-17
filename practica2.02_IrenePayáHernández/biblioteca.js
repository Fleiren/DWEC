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
        return "Introduce un número entero entre 1 y 12.";
    } else if(numero < 1 || numero > 12){
        return "Veo que no sabes contar, introduce un número entre 1 y 12.";
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

/**
 * 
 * @param {number} numero 
 * @returns {Array|string} Me parece una genialidad que pueda devolver un array o un string.
 */
export const multiplosDeTres = (numero) => {
    if(isNaN(numero) || !Number.isInteger(numero) || numero < 1){
        return "Introduce un número válido, debe ser entero y positivo.";
    }
    let multiplos = [];
    //Empiezo en 1 porque el 0 no es múltiplo de 3.
    for(let i=1; i<=numero; i++){
        //Para saber si un número es múltiplo de 3, el resto de dividirlo entre 3 debe ser 0.
        if(i % 3 === 0){
            multiplos.push(i);
        }
    }
    return multiplos;
}

//Ejercicio 4 - Potencia, de números.

/**
 * 
 * @param {number} base 
 * @param {number} exponente 
 * @returns {number|string}
 */
export const potencia = (base, exponente) => {
    if(isNaN(base) || isNaN(exponente) || !Number.isInteger(base) ||!Number.isInteger(exponente)){
        return "Debes introducir un número entero.";
    }
    //Convierto el exponente a positivo para poder hacer el bucle.
    let exponentePositivo = Math.abs(exponente);

    //Se puede usar Math.pow(base, exponente) pero en el ejercicio me piden hacerlo con un bucle while.
    //La variable resultado la inicializo a 1 porque estamos multiplicando.
    let resultado = 1;
    let contador = 0;
    while(contador < exponentePositivo){
        resultado *= base;
        contador++;
    }

    //Si el exponente es negativo debo invertir el resultado.
    return exponente < 0 ? 1/resultado : resultado;
}

//Ejercicio 5 - Media, de números.

/**
 * 
 * @returns {number|string} 
 */
export function mediaDeNumeros(){

    //Insultamos, quiero decir, avisamos al usuario de que la media de números se calcula con números.
    if(arguments.length === 0){
        return "Estaría bien que introdujeras algún número, la verdad.";
    }

    //En esta variable vamos sumando el total de los números.
    let sumaNumeros = 0;
    for(let i=0; i<arguments.length; i++){
        //Nos aseguramos de que todos los números son enteros y positivos.
        if(isNaN(arguments[i]) || !Number.isInteger(arguments[i]) || arguments[i] < 0){
            return "Introduce sólo números enteros positivos.";
        }
        sumaNumeros += arguments[i];
    }
    return sumaNumeros / arguments.length;
    
}

//Ejercicio 6 - Calculadora.


export const calculadora = (numero1, numero2, operador) => {
    if(isNaN(numero1) || isNaN(numero2) || !Number.isInteger(numero1) || !Number.isInteger(numero2)){
        return "Introduce sólo números enteros.";
    }
    switch(operador){
        case "+":
            return numero1 + numero2;
        case "-":
            return numero1 - numero2;
        case "*":
            return numero1 * numero2;
        case "/":
            if(numero2 === 0){
                return "No se puede dividir entre 0.";
            }
            return numero1 / numero2;
        case "%":
            if(numero2 === 0){
                return "No se puede dividir entre 0.";
            }
            return numero1 % numero2;
        default:
            return "Operador no válido, por favor introduce uno de los siguientes (solo uno): +, -, *, /, %";
    }
    
}