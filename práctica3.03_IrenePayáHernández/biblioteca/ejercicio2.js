"use strict";

/**
 * 
 * @param {number[]} numeros 
 * @returns {number[]} con los números mayores que 5
 */
export const mayorQueCinco = (numeros)=>{
    return [...numeros].filter(numero => numero > 5);
}

/**
 * 
 * @returns {number[]} con 10 números aleatorios entre 1 y 10
 */
export const generarArrayDiezNumerosAleatorios = () => {
    const numeros = [];
    for(let i = 0; i < 10; i++){
        /*Math.random genera un número entre el 0 y el 1 (sin incluir el 1), multiplicamos por 10 para que el rango sea entre 0 y 9, sumamos 1 para modificar el rango
        y que sea del 1 al 10 y con Math.floor redondeamos hacia abajo para quedarnos con un número entero.*/
        const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
        numeros.push(numeroAleatorio);
    } 

    
    return numeros;
}

/*APUNTES:

    Hay dos formas de hacer esto más corto y claro pero como no lo conozco, no lo he usado, igualmente dejo las otras formas
    de hacerlo ya que me parecen muy bonitas y puede ser útil:

    Con Array.from se puede crear un array con las posiciones que queramos y luego asignar los valores que queramos con una función de callback.
    Array.from({length:10}, () => Math.floor(Math.random() * 10) + 1)

    Con el spread operator y el constructor de Array podemos crear un array vacío con las posiciones que queremos y luego usar map para asignar los valores.
    [...Array(10)].map(() => Math.floor(Math.random() * 10) + 1)*/ 