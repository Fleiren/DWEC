"use strict";

/**
 * Realiza una petición fetch a una URL dada y devuelve los datos en el formato especificado.
 *
 * @param {string} url - La URL del recurso al que se desea acceder.
 * @param {('blob'|'text'|'json')} tipoDeDato - El tipo de dato en el que se desea procesar la respuesta ('blob', 'text', 'json'). Nota: 'blop' en el código se asume que es un error tipográfico por 'blob'.
 * @returns {Array} Devuelve un array de objetos.
 * @throws {Error} Lanza un error si la respuesta HTTP no es satisfactoria, si el tipo de dato es inválido o si no se reciben datos.
 */
const obtenerDatos = async (url, tipoDeDato) => {
    
        try{
            const respuesta = await fetch(url);
            if(respuesta.ok){
                let datos;
                if(tipoDeDato.toLowerCase() === "blop") datos = await respuesta.blob();
                if(tipoDeDato.toLowerCase() === "text") datos = await respuesta.text();
                if(tipoDeDato.toLowerCase() === "json") datos = await respuesta.json();
                if(datos.results){
                    return datos.results;
                }
                return datos;
            }else{
                throw new Error ("Se ha producido un error al traer datos de la api.");
            }
            
        }catch(error){
        throw error;
        };
}

/**
 * Obtiene los datos de varias url y te los devuelve en un array de objetos.
 * @param {Array} Las url que se van a consultar.
 * @return {Array} El array con los datos que se han consultado mediante las url pasadas por parámetro.
 */
const obtenerDatosUrls = async (urls) => {
    try{
        const promesas = urls.map((url)=>{return obtenerDatos(url, "json")});
        let datos = await Promise.allSettled(promesas);
        datos = datos.filter((dato)=>{return dato.status === "fulfilled"}).map((dato)=>{return dato.value});
        return datos;
    }catch(error){
        throw error;
    }
    

}

/**
 * Extrae el ID numérico de una URL que se espera que termine con una barra inclinada y el ID (ej: ".../recurso/1/").
 *
 * @param {string} url - La URL completa.
 * @returns {string} La ID del recurso (el penúltimo segmento de la URL).
 */
const obtenerIdUrl = (url) => {
    //Sabemos que la id es el número que sale al final de la URL, trabajaremos con métodos de string.
    const elementos = url.split("/");
    //La última posición del array es una cadena vacía porque la url termina en /.
    return elementos[elementos.length-2];
}



export {obtenerDatos, obtenerDatosUrls, obtenerIdUrl};