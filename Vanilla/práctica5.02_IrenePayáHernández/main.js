"use strict";
import { crearAcordeon, mostrarContenido, contarPosicion } from "./biblioteca/ejercicio1.js";
window.onload = () => {
    crearAcordeon();
    document.addEventListener("click", 
        (evento) => {
            let posicion = contarPosicion(evento.target)
            //Con ?? no funciona por lo que he usado el operador &&.
            posicion % 2 !== 0 && mostrarContenido(evento.target.nextElementSibling);
    }, false)
}; //fin onload
