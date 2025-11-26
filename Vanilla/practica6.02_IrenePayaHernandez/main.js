"use strict";
import {obtenerDatos} from "./biblioteca/biblioteca.js";
window.onload = () => {
const peliculas = document.getElementById("peliculas");
const contenedorInformacion = document.getElementById("informacion");
const url = "https://swapi.info/api";
const tipoDeDato = "json";


    //Necesito como declarar una función asincrona que se ejecute sola... he visto una solución pero no me gusta.
        await obtenerDatos(url, tipoDeDato);
    
    
}
    

} //Fin de window.onload