"use strict";
import { numAleatorio } from "./util.js";

const cambiarFondoParrafo = () => {
    //Obtenemos todos los párrafos
    let parrafos = document.getElementsByTagName("p");
    //Para seleccionar de forma aleatoria, con Math.random * parrafos.length obtenemos un número aleatorio entre 0 - length (excluido) y con Math.floor redondeamos hacia abajo (0 - length-1).
    //Si uso length me aseguro de que este método sirva para cualquier página ya que no usamos un número fijo de párrafos.
    let numero = numAleatorio(parrafos.length, 0);

    parrafos[numero].setAttribute("style", `background-color: ${generadorColoresClarosHexadecimal()}`);

}

const generadorColoresClarosHexadecimal = () => {
    //Los colores claros tienen valores altos de rojo, verde y azul (rgb) por lo que generamos números aleatorios con valores altos (180-255, el rango me lo ha dado ChatGPT).
    //El rango que hay es de 75 por lo que para sacar el número aleatorio sacamos un número entre 0-75 y le sumamos 180, así estará dentro del rango.
    let r = numAleatorio(76, 180);
    let g = numAleatorio(76, 180);
    let b = numAleatorio(76, 180);

    //Ahora lo convertimos a hexadecimal y nos aseguramos con el método de string padStart que tenga 2 dígitos siempre y si el número no es de dos dígitos que se coloque un 0 delante.
    //No lo sabía pero indicando un número dentro del método toString lo puedes formatear a hexadecimal, binario, octal...
    r = r.toString(16).padStart(2, "0");
    g = g.toString(16).padStart(2, "0");
    b = b.toString(16).padStart(2, "0");

    return `#${r}${g}${b}`;
}

export {cambiarFondoParrafo}