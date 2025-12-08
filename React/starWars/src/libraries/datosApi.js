"use strict";

/**
 * Realiza una petición fetch a una URL dada y devuelve los datos en el formato especificado.
 *
 * @param {string} url - La URL del recurso al que se desea acceder.
 * @param {('blob'|'text'|'json')} tipoDeDato - El tipo de dato en el que se desea procesar la respuesta ('blob', 'text', 'json'). Nota: 'blop' en el código se asume que es un error tipográfico por 'blob'.
 * @returns {Promise<any>} Una promesa que se resuelve con los datos obtenidos en el formato especificado.
 * @throws {Error} Lanza un error si la respuesta HTTP no es satisfactoria, si el tipo de dato es inválido o si no se reciben datos.
 */
const obtenerDatos = (url, tipoDeDato) => {
    return fetch(url)
    .then((respuesta)=>{
        if(!respuesta.ok) throw new Error("Error en la url.");
        if(tipoDeDato.toLowerCase() === "blop") return respuesta.blob();
        if(tipoDeDato.toLowerCase() === "text") return respuesta.text();
        if(tipoDeDato.toLowerCase() === "json") return respuesta.json();
        else throw new Error("Error con el tipo de dato");
    })
    .then((datos)=>{
        if(!datos) throw new Error("No se han recibido datos");
        return datos;
    })
    .catch((error)=>{
        throw new Error(error.message);
    });
}

/**
 * Busca una película dentro de una lista por su 'episode_id'.
 * Realiza una conversión a entero para asegurar la comparación correcta.
 *
 * @param {Array<Object>} listaPeliculas - El array de objetos película donde buscar.
 * @param {(string)} id - El ID del episodio a buscar.
 * @returns {Object|undefined} El objeto película encontrado o `undefined` si no se encuentra.
 */
const obtenerPeliculaPorId = (listaPeliculas, id) => {
    return listaPeliculas.find((pelicula)=>{return parseInt(pelicula.episode_id) === parseInt(id)});
}

/**
 * Realiza múltiples peticiones asíncronas para obtener datos de un array de URLs.
 * Utiliza `Promise.allSettled` para que todas las promesas se resuelvan (cumplidas o rechazadas) sin detenerse por un fallo.
 *
 * @param {Array<string>} arrayUrl - Array de URLs a las que se debe hacer la petición.
 * @returns {Promise<Array<Object>>} Una promesa que se resuelve con un array de objetos resultado de `Promise.allSettled`, conteniendo el estado (`status`) y el valor (`value`) o razón (`reason`) de cada promesa.
 */
const obtenerDatosDesdeArray = (arrayUrl) => {
    const promesas = arrayUrl.map((url)=>{return obtenerDatos(url, "json")});
    return Promise.allSettled(promesas);
}

/**
 * Filtra los resultados de `Promise.allSettled` para obtener solo las promesas cumplidas (`fulfilled`).
 * Extrae el valor de cada resultado y lo limita a un máximo de 10 elementos.
 *
 * @param {Array<Object>} datos - Array de objetos resultado de `Promise.allSettled` (debe contener las propiedades `status` y `value`).
 * @returns {Array<any>} Un array con los valores (`value`) de las promesas que se cumplieron con éxito, limitado a 10 elementos.
 */
const obtenerDiezFulfilled = (datos) => {
    datos = datos.filter((dato)=>{return dato.status === "fulfilled"});
    datos = datos.map((dato)=>{return dato.value});
    if(datos.length > 10 ){
        datos = datos.slice(0,10);
    }
    return datos;

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



export {obtenerDatos, obtenerPeliculaPorId, obtenerDatosDesdeArray, obtenerDiezFulfilled, obtenerIdUrl};