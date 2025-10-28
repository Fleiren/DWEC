"use strict";

/**
 * Este método extrae todos los actores de la lista que se le pasa por parámetro.
 * @param {Array} peliculas 
 * @returns {Array} Devuelve un array de los actores (sin repetir) que hay en la lista de películas.
 */
const extraerInterpretes = (peliculas) => {
    //Gracias a usar un Map puedo evitar actores repetidos ya que el key será el nombre del actor.
    const interpretes = new Map();

    for (const pelicula of peliculas) {
        for (const interprete of pelicula.elenco) {
            if(!interpretes.has(interprete.nombre)){
                interpretes.set(interprete.nombre, {
                "nombre": interprete.nombre,
                "foto": interprete.foto,
                "biografia": interprete.biografia,
                "peliculas":[
                    {"titulo":pelicula.titulo, "cartelera":pelicula.cartelera}
                ]
                });
            }else{
                const datosInterprete = interpretes.get(interprete.nombre);
                datosInterprete.peliculas = [...datosInterprete.peliculas, {"titulo":pelicula.titulo, "cartelera":pelicula.cartelera}]
            }
            
        }

    }

    //Gracias a esto he conseguido evitar actores repetidos y de paso prácticar con los array de objetos.
        return Array.from(interpretes.values());
}

const extraerInterpreteDetallado = (interpretes, nombreInterprete) =>{
    //Al principio aquí llamaba a la función extraerInterpretes pero igual es demasiada carga porque el componente que usa el método interpreteCompleto hace tres llamadas
    //por lo que he decidido llamar en el propio componente a la función extraerInterpretes para cargar la lista solo una vez.
    return interpretes.find((interprete)=>interprete.nombre===nombreInterprete);
}

export {extraerInterpretes, extraerInterpreteDetallado}