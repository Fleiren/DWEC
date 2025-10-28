"use strict";

/**
 * Este método buscar una película por su id.
 * @param {Array} peliculas 
 * @param {String} id 
 * @returns {Object} Devuelve la película con el id que queremos buscar o undefined si no está.
 */
const buscarPorId = (peliculas, id) => {

    //Como en el JSON la id es un entero, paso a entero la id recibida por parámetro ya que vendrá en formato string.
    const idNum = parseInt(id);
    const pelicula = peliculas.find((pelicula) => {return pelicula.id===idNum;});
    
    //Si no lo encuentra devolverá undefined
    return pelicula;
}

/**
 * Formatea la cantidad de dinero en el formato correcto para España y la moneda solicitada.
 * @param {String} cantidad 
 * @param {String} moneda 
 * @returns {String} La cantidad de dinero formateado.
 */
const formatearTaquilla = (cantidad, moneda) => {
    //El objeto Intl sirve para hacer comparación de strings, formatear números, formato de fechas, etc teniendo en cuenta la geografía (Intl -> Internationalization).    
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: moneda,
    }).format(cantidad);
}

export {buscarPorId, formatearTaquilla}