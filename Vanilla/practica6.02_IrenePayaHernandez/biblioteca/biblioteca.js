"use strict";

const obtenerDatos = (url, tipoDeDato) => {
    return fetch(url).then((respuesta) => {
        if(tipoDeDato.toLowerCase() === "json") return respuesta.json();
        if(tipoDeDato.toLowerCase() === "text") return respuesta.text();
        if(tipoDeDato.toLowerCase() === "blop") return respuesta.blop();
    }).then((datos) => {
        return datos;
    }).catch((error)=>{
        return `Se ha producido un error: ${error.message}`;
    });
}

export {obtenerDatos}